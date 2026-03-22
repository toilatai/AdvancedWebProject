const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { EJSON } = require("bson");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "ClayStudioDatabase";

const fileToCollection = {
  "ClayStudioDatabase.ProductData.json": "ProductsData",
  "ClayStudioDatabase.CustomerData.json": "CustomerData",
  "ClayStudioDatabase.OrderData.json": "OrderData",
  "ClayStudioDatabase.CategoryData.json": "CategoryData",
  "ClayStudioDatabase.AccountCustomerData.json": "AccountCustomerData",
  "ClayStudioDatabase.DeliveryCustomerData.json": "DeliveryCustomerData",
};

function sanitizeJsonText(text) {
  // Remove BOM and trailing commas before } or ] to tolerate loose JSON exports.
  return text.replace(/^\uFEFF/, "").replace(/,\s*([}\]])/g, "$1");
}

function loadDocs(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const cleaned = sanitizeJsonText(raw);
  const parsed = EJSON.parse(cleaned);
  return Array.isArray(parsed) ? parsed : [parsed];
}

async function main() {
  const rootDir = path.resolve(__dirname, "..");
  const dataDir = path.join(rootDir, "data-base");
  const client = new MongoClient(MONGO_URI);

  console.log(`Connecting to ${MONGO_URI} ...`);
  await client.connect();
  const db = client.db(DB_NAME);
  console.log(`Connected. Importing into database: ${DB_NAME}`);

  try {
    for (const [fileName, collectionName] of Object.entries(fileToCollection)) {
      const fullPath = path.join(dataDir, fileName);
      if (!fs.existsSync(fullPath)) {
        console.warn(`Skip: file not found -> ${fileName}`);
        continue;
      }

      const docs = loadDocs(fullPath);
      const collection = db.collection(collectionName);

      await collection.deleteMany({});
      if (docs.length > 0) {
        await collection.insertMany(docs, { ordered: false });
      }

      const count = await collection.countDocuments();
      console.log(`[OK] ${collectionName}: ${count} documents`);
    }
  } finally {
    await client.close();
    console.log("Done.");
  }
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});

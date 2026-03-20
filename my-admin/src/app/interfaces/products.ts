export class Products{
    [x: string]: any;
    constructor(
      public _id: any = null,
      public Name: string = '',
      public Price: string = '',
      public Image: string = '',
      public Description: string = '',
      public Origin: string = '',
      public Customizable: string = '',
      public Store: string = '',
      public Category: string='',
      public Quantity: string = '',
      public Create_date: Date = new Date() 
    ) {}
  }
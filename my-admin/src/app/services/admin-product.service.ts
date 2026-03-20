import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  [x: string]: any;
  constructor(private _http: HttpClient) { }
  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/products', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Products>),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getProduct(ProductId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/products/detail/' + ProductId, requestOptions).pipe(
      map((res) => JSON.parse(res) as Products),
      retry(3),
      catchError(this.handleError)
    );
  }

  getProductCategory(category: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/products/' + category, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Products>),
      retry(3),
      catchError(this.handleError)
    );
  }
  getProductSubCategory(category: string, subcategory: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8  '
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/products/' + category + '/' + subcategory, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Products>),
      retry(3),
      catchError(this.handleError)
    );
  }

  postProduct(product: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('/products', JSON.stringify(product), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Products),
        retry(3),
        catchError(this.handleError)
      );
  }

  putProduct(product: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.put<any>("/products", JSON.stringify(product), requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Products>),
      retry(3),
      catchError(this.handleError))
  }

  deleteProduct(ProductId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.delete<any>("/products/" + ProductId, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Products>),
      retry(3),
      catchError(this.handleError))
  }
}

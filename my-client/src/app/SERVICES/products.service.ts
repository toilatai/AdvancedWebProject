import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Products } from '../Interfaces/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  deleteCart: any;
  constructor(private _http: HttpClient) {}
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
    return this._http
      .get<any>('/products/detail/' + ProductId, requestOptions)
      .pipe(
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
  getProductSubCategory(
    category: string,
    subcategory: string
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .get<any>('/products/' + category + '/' + subcategory, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Products>),
        retry(3),
        catchError(this.handleError)
      );
  }

  addToCart(cos: any): Observable<any> {
    return this._http.post('/cart', cos);
  }
  removeFromCart(cosId: string): Observable<any> {
    return this._http.delete('/cart/delete/' + cosId);
  }
  updateQuantityCart(cos: any): Observable<any> {
    return this._http.put('/cart', cos);
  }
  getCart(): Observable<any> {
    return this._http.get('/cart');
  }
}
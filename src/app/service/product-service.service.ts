import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
 private productData = new BehaviorSubject<any>(null);
  currentProductData = this.productData.asObservable();

  constructor(private http: HttpClient) { }

  setProductData(data: any) {
    this.productData.next(data);
  }

  getProductById(productId: string) {
    return this.http.get(`http://localhost:9090/api/products/${productId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}

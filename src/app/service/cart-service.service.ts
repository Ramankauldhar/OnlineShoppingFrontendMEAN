import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 cartItemsList:any = [];
  quantity!:number;

  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  //Get all the Data
  getOrderData(){
    return this.productList.asObservable();
  }

  //set product Data 
  setProduct(product:any){
    this.cartItemsList.push(...product);
    this.productList.next(product)
  }

  //Add to cart the product details
  addToCart(product:any){
    this.cartItemsList.push(product);
    this.productList.next(this.cartItemsList);
    this.getTotal();
    console.log(this.cartItemsList);
  }

  //Get Total of all the items in the cart
  getTotal():number{
    let grandTotal=0;
    this.cartItemsList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  //Remove cart data by id (one by one)
 removeCartData(product: any) {
  const index = this.cartItemsList.findIndex((item: any) => product.id === item.id);
  if (index !== -1) {
    this.cartItemsList.splice(index, 1);
    this.productList.next(this.cartItemsList);
  }
}
  //Remove all cart items
  removeAllCartItems(){
    this.cartItemsList = []
    this.productList.next(this.cartItemsList)
  }
}

import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { FetchDataServiceService } from 'src/app/service/fetch-data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
products:any = [];
productList : any;
public grandTotal:number = 0;
public quantity: number = 1;

 constructor(private cartService: CartServiceService, private route: ActivatedRoute, private router:Router, private fetchDataService: FetchDataServiceService){}

 ngOnInit(): void {

   this.cartService.getOrderData().subscribe(res=>{
    this.products = res;
    this.products.forEach((i:any) =>{
       Object.assign(i,{quantity:1, total:i.price})
    });
    console.log(this.products);
    this.grandTotal = this.cartService.getTotal();
   });

 }
 
 deleteProductFromSelection(item:any){
  this.cartService.removeCartData(item);
 }

 deleteAllProductsFromCart(){
  this.cartService.removeAllCartItems();
 }

increaseQuantity(product: any) {
  product.quantity = product.quantity + 1; 
}

decreaseQuantity(product: any) {
  if (product.quantity > 1) {
    product.quantity = product.quantity - 1;
  }
}
updateSubtotal(product: any) {
  product.total = product.price * product.quantity;
  this.calculateGrandTotal();
}
calculateGrandTotal() {
  this.grandTotal = this.products.reduce((total:any, product:any) => total + (product.total || 0), 0);
}

 checkOutFunction() {
    const queryParams = {
      products: this.products,
      grandTotal: this.grandTotal
    };
    this.router.navigate(['/checkout'], { queryParams: { data: JSON.stringify(queryParams) } });
  }

}
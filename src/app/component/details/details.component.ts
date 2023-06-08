import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { FetchDataServiceService } from 'src/app/service/fetch-data-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productId!: string;
  product: any;
  quantity!: number;
  total!: number;
  relatedProducts!: any[];
  deliveryDate!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private cartApiService: CartServiceService,
    private router: Router,
    private fetchDataService: FetchDataServiceService
  ) { }

  ngOnInit() {    
    this.getRelatedProducts();

    const today = new Date();
       // Calculate the date three days ahead
    const deliveryDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
       // Format the date as desired (e.g., "dd/mm/yyyy")
    const formattedDate = deliveryDate.getDate() + '/' + (deliveryDate.getMonth() + 1) + '/' + deliveryDate.getFullYear();
       // Assign the formatted date to the variable
    this.deliveryDate = formattedDate;

    this.productService.currentProductData.subscribe(productData => {
      if (productData) {
        this.product = productData.product;
        this.quantity = productData.quantity;
        this.total = productData.total;
      } else {
        this.productService.getProductById(this.productId).subscribe((product: any) => {
          this.product = product;
          this.product.forEach((i:any) =>{
             Object.assign(i,{quantity:1, total:i.price})
          });
        });
      }
    });
  }

  addToCart(product: any) {
    this.cartApiService.addToCart(product);
    this.router.navigate(['/home']);
  }

  getRelatedProducts() {
  this.fetchDataService.getProductList().subscribe((products: any[]) => {
    this.relatedProducts = products.filter((product: any) => product.category === this.product.category);
  });
}
  details(productId: string){
    this.productService.getProductById(productId).subscribe((product: any) => {
    this.productService.setProductData({ product});
    this.router.navigate(['/details', productId]);
  });
}
}

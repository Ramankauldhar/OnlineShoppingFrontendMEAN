import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { FetchDataServiceService } from 'src/app/service/fetch-data-service.service';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../service/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any;
  searchKey: string = "";
  filterCategory: any;
  products: any[] = [];

  isLoading: boolean = true; // Initially set to true to display the loading indicator

  constructor(private fetchProductsApiService: FetchDataServiceService, private cartApiService: CartServiceService, private productService: ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProductsApiService.getProductList().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      this.isLoading = false;
      this.productList.forEach((i: any) => {
        if (i.category === "Women Wear" || i.category === "Sweater") {
          i.category = "Cloths"
        }
        if (i.category === "Foot wear" || i.category === "Foot Wear") {
          i.category = "Foot wear"
        }
        Object.assign(i, { quantity: 1, total: i.price })
      });
      console.log(this.productList);
    });
    this.cartApiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });

  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
      else {
        return "No data Found!";
      }
    });
  }

  navigateToDetails(productId: string, quantity: number, total: number) {
    this.productService.getProductById(productId).subscribe((product: any) => {
      this.productService.setProductData({ product, quantity, total });
      this.router.navigate(['/details', productId]);
    });
  }
}


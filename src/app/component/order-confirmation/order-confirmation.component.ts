import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router, private cartServie:CartServiceService){}
  products: any = [];
  Name!: string;
  Email!: string;
  Address!: string;
  Contact!: string;
  deliveryDate!: string;
  total!:number;

  ngOnInit(){
     this.route.queryParams.subscribe(params => {
         if (params['data']) {
           const queryParams = JSON.parse(params['data']); 
           this.Name = queryParams.Name;
           this.Email = queryParams.Email;
           this.Address = queryParams.Address;
           this.Contact = queryParams.Contact;
           this.total = queryParams.Total;
           this.products = queryParams.products;

           console.log(this.products);
          }
       });

    const today = new Date();
       // Calculate the date three days ahead
    const deliveryDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
       // Format the date as desired (e.g., "dd/mm/yyyy")
    const formattedDate = deliveryDate.getDate() + '/' + (deliveryDate.getMonth() + 1) + '/' + deliveryDate.getFullYear();
       // Assign the formatted date to the variable
    this.deliveryDate = formattedDate;
    
    this.cartServie.removeAllCartItems();
}
}

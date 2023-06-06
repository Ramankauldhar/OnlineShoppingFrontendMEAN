import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkOutForm!: FormGroup;
  submitted = false;

  products: any = [];
  public grandTotal:number = 0;
    
  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private productService:ProductServiceService)
    {}

    ngOnInit(){
       this.route.queryParams.subscribe(params => {
         if (params['data']) {
           const queryParams = JSON.parse(params['data']); 
           this.products = queryParams.products;
           this.grandTotal = queryParams.grandTotal;
           console.log(this.products);
          }
       });
      this.checkOutForm = this.formBuilder.group(
        {
          name1:['', Validators.required],
          email:['', [Validators.required, Validators.email]],
          contact:['', [Validators.required,  Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')]],
          address:['', Validators.required],
          city:['', Validators.required],
          province:['', Validators.required],
          code:['',[Validators.required, Validators.maxLength(6)]],
          name:['', Validators.required],
          card:['', Validators.required],
          cvv:['', Validators.required],
          exDate:['', Validators.required]
        }
      )}
  sanitizeCardNumber(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const sanitizedValue = inputElement.value.replace(/\D/g, '');
      this.checkOutForm.controls['card'].setValue(sanitizedValue);
    }
    sanitizeCVV(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const sanitizedValue = inputElement.value.replace(/\D/g, '');
      this.checkOutForm.controls['cvv'].setValue(sanitizedValue);
    }
    sanitizeExpiryDate(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const sanitizedValue = inputElement.value.replace(/\D/g, '');
      this.checkOutForm.controls['exDate'].setValue(sanitizedValue);
    }

  finalCheckOut() {
    this.submitted = true;
    if(this.checkOutForm.invalid){
      return;
    }
   
     let productsInfo = '';
  this.products.forEach((product: any) => {
    productsInfo += 'Title: ' + product.title + ', Price: ' + product.price + '\n';
  });

  const payload = {
    Name: this.checkOutForm.value.name1,
    Email: this.checkOutForm.value.email,
    Address: [this.checkOutForm.value.address,this.checkOutForm.value.city,this.checkOutForm.value.province,this.checkOutForm.value.code],
    Contact: this.checkOutForm.value.contact,
    Order: productsInfo
  };

  alert("Order Confirmed!\n" + JSON.stringify(payload));
}

}
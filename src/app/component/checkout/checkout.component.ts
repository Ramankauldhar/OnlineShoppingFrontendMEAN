import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkOutForm!: FormGroup;
  submitted = false;

  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder)
    {}

    ngOnInit(){
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
      return
    }
  }
}

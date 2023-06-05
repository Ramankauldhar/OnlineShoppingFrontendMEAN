import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItems:number = 0;
  searchedText!:string;
  constructor(private cartService: CartServiceService){

  }
  ngOnInit(): void{
    this.cartService.getOrderData().subscribe(res=>{
      this.totalItems = res.length;
    })
    
  }

  search(event:any){
    this.searchedText = (event.target as HTMLInputElement).value;
    console.log(this.searchedText);
    this.cartService.search.next(this.searchedText);
  }
}

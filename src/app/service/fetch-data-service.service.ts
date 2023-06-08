import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDataServiceService {

 constructor( private http: HttpClient) { }

  getProductList(){
    return this.http.get("https://onlineshopping-7goc.onrender.com/api/getProducts").pipe(map((res:any)=>{
        return res;
    }))
  }
}

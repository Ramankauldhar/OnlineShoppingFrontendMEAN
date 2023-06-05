import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDataServiceService {

 constructor( private http: HttpClient) { }

  getProductList(){
    return this.http.get("http://localhost:9090/api/getProducts").pipe(map((res:any)=>{
        return res;
    }))
  }
}

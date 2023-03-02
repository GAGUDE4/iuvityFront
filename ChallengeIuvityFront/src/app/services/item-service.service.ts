import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../modules/item';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  url: string = '/kardex';

  constructor(private http: HttpClient) { }

  getLista(): Observable<Item[]> {
    const headers  = new HttpHeaders({Authorization: 'Basic ' + btoa("Admin:admin")})
    return this.http.get<Item[]>('/kardex/verLista', { headers, responseType: 'text' as 'json'});
  }

  postAddItem(item: Item): Observable<Item> {
    const headers  = new HttpHeaders({Authorization: 'Basic ' + btoa("Admin:admin")})
    return this.http.post<Item>('/kardex/addProduct', item, { headers, responseType: 'text' as 'json'})
  }
  
}

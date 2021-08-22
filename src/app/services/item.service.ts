import { Injectable } from '@angular/core';
import { AddItemComponent } from '../components/add-item/add-item.component';

// importo la clase Item en el Service
import { Item } from '../models/item';

//importo el HttpClient
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  //defino las variables

      //defino mis headers para intercambiar info con el servidor
  httpOptions={
    headers: {
      'Content-Type':'Application/json'
    }
  };

  url:string='http://localhost:3000/items';
  items:Item[]=[];

  //inyecto el HttpClient como variable
  constructor(private http:HttpClient) { }

  // defino un metodo global donde obtengo los datos de la lista de items
  
  getItems():Observable<Item[]>{
    //Aclaro que voy a recibir un elemento Observable de tipo arreglo de Item

      // hago el pedido http según el tipo de item que busco y la url seteada por mí
    return this.http.get<Item[]>(this.url);

  }

  addItem(item:Item):Observable<Item>{
    //this.items.unshift(item);

    return this.http.post<Item>(this.url,item,this.httpOptions)
  }

  //utilizo este metodo para modificar items
  goTotal(item:Item):Observable<Item>{
    return this.http.put<Item>(this.url + item.id , item , this.httpOptions)
  }

  //utilizo este metodo para borrar items
  deleteItem(item:Item):Observable<Item>{
    return this.http.delete<Item>(this.url + item.id)
  }

}

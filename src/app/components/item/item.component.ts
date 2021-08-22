import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//importo la clase item de la carpeta models, para poder asignarla a la propiedad item
import{Item} from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  // esta clase recibe a través de la propiedad item, un objeto de clase Item
    @Input() item:Item = new Item();
    @Output() deleteItem:EventEmitter<Item> = new EventEmitter();
  /* como para borrar el item tengo que modificar la lista de items, entonces creo un output
  para enviar la orden de borrar en items.component.
  El output lo hace a traves de un evento personalizado llamado 'deleteItem' que recibe el objeto
  tipo Item.
  */

  @Output() goTotal:EventEmitter<Item> = new EventEmitter();
   

  constructor() { }

  ngOnInit(): void {
  }

  //creo el método onDelete, que recibe un objeto item de tipo 'Item'
  onDelete(item:Item){
    // le paso el elemento item a mi evento deleteItem para que vaya a items.component y lo borre
    this.deleteItem.emit(item);
  }

  onToggle(item:Item){
    item.completed = !item.completed 
    this.goTotal.emit(item); /* cuando hago un cambio en el item, emito el evento goTotal que
    modifica el total en items.component*/
  }

  

}

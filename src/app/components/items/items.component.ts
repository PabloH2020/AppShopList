import { Component, OnInit } from '@angular/core';
import {Item} from '../../models/item';
//importo el servicio para poder utilizar sus datos
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  //creo un arreglo con objetos de clase Item
  items:Item[]=[];   // siempre inicializo las variables porque trabajo con tipado escricto en este caso
  total:number=0;

  
  // inyectamos el servicio ItemService en el constructor a la variable itemService
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {   // aqui defino los datos que aparecen desde el inicio
    //dentro de este componente asigno objetos dentro del arreglo items, de clase Item
    //this.items =[ ]

    /* A mi variable items le asigno los datos que tengo en el Service a partir del método getItems()
    del propio Service obtenido con mi variable itemService.*/
    //this.items = this.itemService.getItems();


    //me suscribo para obtener los datos traidos del Server
    this.itemService.getItems().subscribe( data=>{
      this.items = data;
      this.getTotal();
    } );

    

  }

  deleteItem(item:Item){
    // actualizo la lista de items sin agregar el que quiero eliminar
    this.items = this.items.filter( objeto => objeto.id != item.id )
    this.itemService.deleteItem(item).subscribe();
    this.getTotal();
  }

  goTotal(item:Item){
    this.itemService.goTotal(item).subscribe();
    this.getTotal()
  }

  getTotal(){
    this.total = this.items
                  .filter( item => !item.completed )
                  .map( item => item.quantity * item.price )
                  .reduce( (acc,item)=> acc+= item,0 )

                  console.log(this.total);
  }

 

}

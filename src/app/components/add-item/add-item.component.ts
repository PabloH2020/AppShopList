import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

import { Router } from '@angular/router';

//importo el Service
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  id:number=0;
  title:string='';
  quantity:number=0;
  price:number=0;

    //Inyecto el Service en el constructor 
  constructor(private itemService:ItemService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const item = new Item();
    item.id = this.id;
    item.title = this.title;
    item.price = this.price;
    item.quantity = this.quantity;

    //this.itemService.addItem(item)

    // añado el item al servidor y me dirigo a la pagina principal para verlo
    this.itemService.addItem(item).subscribe( i=>{
      this.router.navigate(['/']);
    } )
  }

}

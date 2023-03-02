import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../modules/item';
import { ItemServiceService } from '../services/item-service.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  data: any;

  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
    this.itemService.getLista().subscribe(
      res => {
        console.log(res)
        this.data = JSON.parse(res.toString());
        console.log(this.data)
      }
    );
  }

}

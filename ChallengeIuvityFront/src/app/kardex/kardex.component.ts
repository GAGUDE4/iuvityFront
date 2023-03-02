import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../modules/item';
import { ItemServiceService } from '../services/item-service.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  items:any;
  id:number = 0;
  checkoutForm:any;
  data: any;
  formulario:boolean = false;
  detalleType:string = "";
  day:any;
  txtButton:string = "";
  txtAlert:string = "";
  alert:boolean = false;


  constructor(
    private itemService: ItemServiceService,
    private formBuilder: FormBuilder
    ){ 
    this.checkoutForm = this.formBuilder.group({
      detalle: '',
      cantidad: 0,
      unitario:0
    });
  }

  ngOnInit(): void {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    this.day =  this.replaceAll(hoy.toISOString().substring(0,10), "-","/") ; 
    this.checkoutForm.controls['detalle'].disable();
    this.getData();
  }

  getData(){
    this.itemService.getLista().subscribe(
      res => {
        console.log(res)
        this.data = JSON.parse(res.toString());
        console.log(this.data)
      }
    );
  }

  stock(aumento:boolean){
    if (aumento) {
      this.detalleType = "Compra"
      this.txtButton = "Agregar";
    }else{
      this.detalleType = "Venta"
      this.txtButton = "Enviar";
    }
    this.formulario = true;
  }


  addItem(item:any){

    this.itemService.postAddItem(item).subscribe(
      res =>{
        this.getData();
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 1000);
      }
    );

  }

  onSubmit(customerData:any) {
    this.id++;
    if (this.detalleType == "Compra") {
      const itemData: Item = {
        id: this.id,
        fecha: this.day,
        detalle: this.detalleType,
        cantidadEntrada: customerData.cantidad,
        vrUnitarioEntrada: customerData.unitario,
        vrTotalEntrada: 0,
        cantidadSalida: 0,
        vrUnitarioSalida: 0,
        vrTotalSalida: 0,
        cantidadSaldos: 0,
        vrUnitarioSaldos: 0,
        vrTotalSaldos: 0,
      };
      this.txtAlert = "Item Agregado";
      this.addItem(itemData);
    }else{ //Venta
      const itemData: Item = {
        id: this.id,
        fecha: this.day,
        detalle: this.detalleType,
        cantidadEntrada: 0,
        vrUnitarioEntrada: 0,
        vrTotalEntrada: 0,
        cantidadSalida: customerData.cantidad,
        vrUnitarioSalida: customerData.unitario,
        vrTotalSalida: 0,
        cantidadSaldos: 0,
        vrUnitarioSaldos: 0,
        vrTotalSaldos: 0,
      };
      if (this.id != 1) {
        this.txtAlert = "Item Descontado";
        this.addItem(itemData);
      }
    }
    
  }

  home(){
    this.formulario = false;
  }

  replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
}

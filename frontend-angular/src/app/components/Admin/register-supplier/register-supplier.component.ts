import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Item {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss']
})
export class RegisterSupplierComponent implements OnInit {

  items: Item[] = [
    {value: 'spare-parts-0', viewValue: 'Spare-Parts'},
    {value: 'tool-1', viewValue: 'Tools'},
    {value: 'paint-2', viewValue: 'Paint'}
  ];

  constructor() { }

  onSubmit(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }



  }

  ngOnInit() {
  }

}

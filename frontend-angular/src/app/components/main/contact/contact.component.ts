import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {  NgForm, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  latitude:any;
  longitude:any;
  zoom = 4;
  myGroup: FormGroup;


  onChoseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.zoom = 8;


  }
  onSubmit(form: NgForm){
    if (form.invalid){
      return;
    }
  }


  constructor() { }

  ngOnInit() {
    this.latitude = 5.9459161;
    this.longitude = 80.5291188;
    this.zoom = 15;
    this.myGroup = new FormGroup({
      firstName: new FormControl()
   });

  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {  NgForm, FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  enteredName = '';
  enteredEmail = '';
  enteredSubject = '';
  enteredContent = '';


  latitude:any;
  longitude:any;
  zoom = 4;



  onChoseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.zoom = 8;


  }
  onSubmit(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }


  }


  constructor() { }

  ngOnInit() {

    this.latitude = 5.9459161;
    this.longitude = 80.5291188;
    this.zoom = 15;


  }

}

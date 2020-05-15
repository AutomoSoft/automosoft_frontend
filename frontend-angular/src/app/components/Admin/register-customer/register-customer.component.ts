import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../../../_services/customer.model';


@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
/*.resetForm(form:NgForm)
{ 
  if(form != null)

 form.reset();
    this.user = {
        userid : "",
        firstName : "",
        lastName : "",
        email : "",
        contactNo : "",
        vehicleRegNo : "",
    }
}*/

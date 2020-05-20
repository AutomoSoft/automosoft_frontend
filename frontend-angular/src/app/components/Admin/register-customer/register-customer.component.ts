import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  cookie;
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
}

customerForm = this.fb.group({
  userid: ["", Validators.required],
  password: ["", Validators.required],
  firstName: ["", Validators.required],
  lastName: ["", Validators.required],
  email: ["", Validators.required],
  contactNo: ["", Validators.required],
  vehicleRegNo: ["", Validators.required],

});

addCustomer() {
  let date=Date();
  const registerCustomer = {
    usertype : "Customer",
    userid: this.customerForm.value.userid,
    password: this.customerForm.value.password,
    firstName: this.customerForm.value.firstName,
    lastname: this.customerForm.value.lastname,
    email: this.customerForm.value.email,
    contactnumber: this.customerForm.value.contactNo,
    vehicleRegNo: this.customerForm.value.vehicleRegNo,
    addedby: this.cookie.userid,
    addedon: date,
  };

  var url = "http://localhost:3000/users/register";

  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: "Are you sure want to Add?",
      buttonText: {
        ok: "Yes",
        cancel: "No"
      }
    }
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {

    if (confirmed) {
      this.http.post<any>(url, registerCustomer).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          window.location.reload();
          // this.customerForm.reset();
        } else {
          console.log(res.msg);
          alert("Error!! Try Again");
          this.router.navigate([this.cookie.userid,'registerCustomer']);
        }
      });
      console.log(registerCustomer);
    }
  });

}
reset(){
  this.customerForm.reset();
}

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


//DONOT DELETEEE

// customerForm = this.fb.group({
//   customerDetails: this.fb.group({
//     userid: ["", Validators.required],
//     password: ["", Validators.required],
//     firstName: ["", Validators.required],
//     lastName: ["", Validators.required],
//     email: ["", Validators.required],
//     contactNo: ["", Validators.required],
//   }),
//   vehicles: this.fb.array([this.vehicles]),

// });

// get vehicles(): FormGroup {
//   return this.fb.group({
//     // vehicleType: ["", Validators.required],
//     vehicleRegNo: ["", Validators.required],
//   });
// }

// addVehicle() {
//   (this.customerForm.get("vehicles") as FormArray).push(this.vehicles);
// }

// addCustomer() {
//   const registerCustomer = {
//     usertype : "Customer",
//     userid: this.customerForm.value.customerDetails.userid,
//     password: this.customerForm.value.customerDetails.password,
//     firstName: this.customerForm.value.customerDetails.firstName,
//     lastname: this.customerForm.value.customerDetails.lastname,
//     email: this.customerForm.value.customerDetails.email,
//     contactnumber: this.customerForm.value.customerDetails.contactNo,
//     // date: this.customerForm.value.date,
//     vehicles: this.customerForm.value.vehicles,
//   };

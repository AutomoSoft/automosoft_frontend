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
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {

  opened: boolean;
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

employeeForm = this.fb.group({
  usertype: ["", Validators.required],
  userid: ["", Validators.required],
  firstName: ["", Validators.required],
  lastName: ["", Validators.required],
  gender: ["", Validators.required],
  nic: ["", Validators.required],
  address: ["", Validators.required],
  contactNo: ["", Validators.required],
  email: ["", Validators.required],
  password: ["", Validators.required],

});

addEmployee() {
  const registerEmployee = {
    usertype : this.employeeForm.value.usertype,
    userid: this.employeeForm.value.userid,
    firstName: this.employeeForm.value.firstName,
    lastName: this.employeeForm.value.lastName,
    gender: this.employeeForm.value.gender,
    nic: this.employeeForm.value.nic,
    address: this.employeeForm.value.address,
    contactnumber: this.employeeForm.value.contactNo,
    email: this.employeeForm.value.email,
    password: this.employeeForm.value.password,
    // date: this.customerForm.value.date, //add added by and added on fields
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
      this.http.post<any>(url, registerEmployee).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          window.location.reload();
          // this.customerForm.reset();
        } else {
          console.log(res.msg);
          alert("Error!! Try Again");
          this.router.navigate([this.cookie.userid,'registerEmployee']);
        }
      });
      console.log(registerEmployee);
    }
  });
}


reset(){
  this.employeeForm.reset();
}
  ngOnInit() {
  }

}

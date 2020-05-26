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
  images;
  filename;
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
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
  contactNo: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
  email: ["", [Validators.required, Validators.email]],
  password: ["", [Validators.required, Validators.minLength(8)]],

});

selectImage(event) {
  if (event.target.files.length > 0) {  // check the file is select or not.
    const file = event.target.files[0];
    this.images = file;
    this.filename = file.name;
    //console.log(file);
  }
}

addEmployee() {

  let date=Date();
  const registerEmployee = {
    profileImage: this.images,
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
    addedby: this.cookie.userid,
    addedon: date,
  };


  var url = "http://localhost:3000/users/register";

  if (this.images == null) {  //check profile image select or not
    let config = new MatSnackBarConfig();
    config.duration = true ? 2000 : 0;
    this.snackBar.open("Please select a profile picture..! ", true ? "Ok" : undefined, config);
  }else {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure want to Add?",
        buttonText: {
          ok: "Yes",
          cancel: "No"
        }
      },
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


}


reset(){
  this.employeeForm.reset();
}
  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
  }

}

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
  flag; //used to show/hide technician skills fields
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
  nicnumber: ["", Validators.required],
  address: ["", Validators.required],
  contactNo: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
  email: ["", [Validators.required, Validators.email]],
  password: ["", [Validators.required, Validators.minLength(8)]],
  skills: this.fb.group({
    expertise: [""],
    capacity: [""]
  })

});

//button event to upload profile image
selectImage(event) {
  if (event.target.files.length > 0) {  // check if file selected.
    const file = event.target.files[0];
    this.images = file;
    this.filename = file.name;
    //console.log(file);
  }
}

addEmployee() {

  if (this.employeeForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
    let date=Date();
    const formData = new FormData();
        //append the data to the form
        formData.append('profileImage', this.images)
        formData.append('usertype', this.employeeForm.value.usertype)
        formData.append('userid', this.employeeForm.value.userid)
        formData.append('firstName', this.employeeForm.value.firstName)
        formData.append('lastName', this.employeeForm.value.lastName)
        formData.append('gender', this.employeeForm.value.gender)
        formData.append('nicnumber', this.employeeForm.value.nicnumber)
        formData.append('address', this.employeeForm.value.address)
        formData.append('contactnumber', this.employeeForm.value.contactNo)
        formData.append('email', this.employeeForm.value.email)
        formData.append('password', this.employeeForm.value.password)
        formData.append('expertise', this.employeeForm.value.skills.expertise)
        formData.append('capacity', this.employeeForm.value.skills.capacity)
        formData.append('addedby',  this.cookie.userid)
        formData.append('addedon', date)
        formData.append('lastmodifiedby',  "Never Modified")
        formData.append('lastmodifiedon', date)



    var url = "http://localhost:3000/users/register";

    if (this.images == null) {  //check profile image select or not
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please select a profile picture..! ", true ? "OK" : undefined, config);
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
          this.http.post<any>(url, formData).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              window.location.reload();

            } else {
              console.log(res.msg);
              alert("Error!! Try Again");
              this.router.navigate([this.cookie.userid,'registerEmployee']);
            }
          });
          console.log(formData);
        }
      });

    }


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

  togglefunction(value) {
    if (value == "Technician") {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

}

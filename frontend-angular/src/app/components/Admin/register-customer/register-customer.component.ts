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
//import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  /*separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];*/


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

customerForm = this.fb.group({
  userid: ["", Validators.required],
  firstName: ["", Validators.required],
  lastName: ["", Validators.required],
  gender: ["", Validators.required],
  nicnumber: ["", Validators.required],
  address: ["", Validators.required],
  email: ["", [Validators.required, Validators.email]],
  contactNo: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
  password: ["", [Validators.required, Validators.minLength(8)]],
  //confirmPassword:["", [Validators.required, Validators.minLength(8)]],
  vehicles: this.fb.array([this.vehicles]),
  //phone: new FormControl(undefined, [Validators.required])

});
/*changePreferredCountries() {
  this.preferredCountries = [CountryISO.India, CountryISO.Canada];
}*/

//button event to upload profile image
selectImage(event) {
  if (event.target.files.length > 0) {  // check if file selected.
    const file = event.target.files[0];
    this.images = file;
    this.filename = file.name;
    //console.log(file);
  }
}


get vehicles(): FormGroup {
  return this.fb.group({
    vehicleRegNo: ["", Validators.required],
    chasis: ["", Validators.required],
    EngineNo: ["", Validators.required],
  });
}
addVehicle ()
{
  (this.customerForm.get("vehicles") as FormArray).push(this.vehicles);
}

addCustomer() {


  if (this.customerForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
    let date=Date();
    const formData = new FormData();
        //append the data to the form
        formData.append('profileImage', this.images)
        formData.append('usertype', "Customer")
        formData.append('userid', this.customerForm.value.userid)
        formData.append('firstName', this.customerForm.value.firstName)
        formData.append('lastName', this.customerForm.value.lastName)
        formData.append('gender', this.customerForm.value.gender)
        formData.append('nicnumber', this.customerForm.value.nicnumber)
        formData.append('address', this.customerForm.value.address)
        formData.append('contactnumber', this.customerForm.value.contactNo)
        formData.append('email', this.customerForm.value.email)
        formData.append('password', this.customerForm.value.password)
        formData.append('vehicles', JSON.stringify(this.customerForm.value.vehicles))
        formData.append('addedby',  this.cookie.userid)
        formData.append('addedon', date)
        formData.append('lastmodifiedby',  "Never Modified")
        formData.append('lastmodifiedon', date)


  var url = "http://localhost:3000/users/register";
  // console.log(formData)

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
            this.router.navigate([this.cookie.userid,'registerCustomer']);
          }
        });
        console.log(formData);
      }
    });

  }


}



}
reset(){
  this.customerForm.reset();
}

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
  }

}



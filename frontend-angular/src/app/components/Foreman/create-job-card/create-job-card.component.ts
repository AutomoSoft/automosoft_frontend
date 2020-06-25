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
  selector: 'app-create-job-card',
  templateUrl: './create-job-card.component.html',
  styleUrls: ['./create-job-card.component.scss']
})
export class CreateJobCardComponent implements OnInit {

  cookie;
  flag1 = false;  //show select vehicles field
  flag2 = false;  //show available technicians
  custID;         // get customer vehicles
  jobCat;        // filter technicians
  custVehicles;
  techExpertise: [];
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

jobCardForm = this.fb.group({
  jobType: ["", Validators.required],
  jobNo: ["", Validators.required],
  custId: ["", Validators.required],
  vehicle: ["", Validators.required],
  probCus: ["", Validators.required],
  foremanObv: ["", Validators.required],
  estCharge: ["", Validators.required],
  jobStatus:[""],


});

ngOnInit() {

}

// ******************************************** Get Registered Customer Vehicles  ************************************************************
selectVehicle(id){

  //console.log(id);
  const url = "http://localhost:3000/users/getVehicles"


  this.http.get<any>(url + "/" + id).subscribe(res => {
    if (res.state == false) {
      this.flag1 = false;
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Customer Not Registered !!! , Please Register First", true ? "Retry" : undefined, config);
    } else {
      this.flag1 = true;
      this.custVehicles =JSON.parse(res.data.vehicles);
      console.log(this.custVehicles);

    }
  });
}

// ******************************************** Show available technicians of a selected job Type ******************************************
selectTechnician(category){

  //console.log(category)
  const url = "http://localhost:3000/users/getTechnicians"


  this.http.get<any>(url + "/" + category).subscribe(res => {
    if (res.state == false) {
      this.flag2 = false;
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! Please Check Job Category", true ? "Retry" : undefined, config);
    } else {
      this.flag2 = true;
      //console.log(res.data);
      this.techExpertise = res.data;


    }
  });
}

}

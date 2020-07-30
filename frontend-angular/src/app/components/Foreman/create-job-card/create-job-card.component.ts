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
  flag2 = false;  //show technicians section
  custID;         // get customer vehicles
  techID;
  jobCat;        // filter technicians
  custVehicles;
  techExpertise: [];
  selectedTech = [] as any;
  itemsUsed = [];
  dateAdded;

  lastJobString;      //jobNo of the last created job(String)
  lastJobNo;          //jobNo of the last created job (Part excluding "JOB")
  newJobNo;           //jobNo of the new Job

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
  technicians: [""],
  jobStatus:[""],


});

ngOnInit() {
  var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }

    // ******************************************** Get Last Job Number  ************************************************************

    const url = "http://localhost:3000/getLastId/getLastJobNo";

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.lastJobString = res.data[0].jobNo;
        var splitted = this.lastJobString.split("JOB", 2);
        this.lastJobNo = parseInt(splitted[1], 10)          //extract the numeric part
        this.newJobNo = this.lastJobNo + 1;
        //console.log(this.lastJobNo);
      }
    });

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
      this.custVehicles =res.data.vehicles;
      console.log(this.custVehicles);

    }
  });
}

// ******************************************** Technicians for Jobs ********************************************************

//search tecnicians from relavant category
selectTechnician(category){

  //console.log(category)
  const url = "http://localhost:3000/technician/getTechnicians";

  this.http.get<any>(url + "/" + category).subscribe(res => {
    if (res.state == false) {
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

//add technician to a particular job - Job Card comp

addTechJob(id,category){
  //console.log(id);
  this.techID = id;
  this.dateAdded=new Date();
  this.selectedTech.push([this.techID, this.dateAdded]);    //add selected techniciancs to the selectedTech array

  const url = "http://localhost:3000/technician/addTechnicians"

  this.http.get<any>(url + "/" + this.techID).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! ", true ? "Retry" : undefined, config);
    } else {

      //console.log(res.data);
      const url = "http://localhost:3000/technician/getTechnicians"


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
  });

}

//remove/clear technicians from a job - Job Card comp
remTechJob(id,category){
  //console.log(id);
  this.techID = id;

  this.selectedTech.pop(this.techID);   //remove technicians from selection

  const url = "http://localhost:3000/technician/remTechnicians"

  this.http.get<any>(url + "/" + this.techID).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! ", true ? "Retry" : undefined, config);
    } else {

      //console.log(res.data);
      const url = "http://localhost:3000/technician/getTechnicians"


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
  });

}

// ******************************************** Create Job Card ********************************************************


createJobCard() {

  let date=Date();
  const createJob = {
    jobType : this.jobCardForm.value.jobType,
    jobNo: 'JOB00'+this.jobCardForm.value.jobNo,
    custId: this.jobCardForm.value.custId,
    vehicle: JSON.stringify(this.jobCardForm.value.vehicle),
    probCus: this.jobCardForm.value.probCus,
    foremanObv: this.jobCardForm.value.foremanObv,
    estCharge: this.jobCardForm.value.estCharge,
    technicians: this.selectedTech,
    itemsUsed: this.itemsUsed,
    addedby: this.cookie.userid,
    addedon: date,
    lastmodifiedby: "Never Modified",
    lastmodifiedon: date,
    jobStatus: "Queued",
  };

    var url = "http://localhost:3000/jobs/addNewJob";

    if (this.jobCardForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }else {
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
        this.http.post<any>(url, createJob).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            window.location.reload();
          } else {
            console.log(res.msg);
            alert("Error!! Try Again");
            this.router.navigate(['createJob']);
          }
        });
        console.log(createJob);
      }
    });
    }
}
save(){
  console.log(this.selectedTech);
}
}

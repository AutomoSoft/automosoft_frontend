import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MycookiesService} from '../../Admin/mycookies.service';
import { MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
} from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../../Auth/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  cookie;
  userid;
  items = [];
  jobs;
  getData;
  selectedJob;
  firstName;
  getCustomers;
  customerData;
  allItems = [];
  constructor( private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,) {
      if (cookies.userData && cookies.userData.userid) {
        this.userid = cookies.userData.userid;
      }
    }
    withdrawalForm = this.fb.group({
      invoiceNo: ["",Validators.required],
      invoiceDate: ["",Validators.required],
      foremanid: ["", Validators.required],
      collectedby: ["", Validators.required],
      job: ["", Validators.required],
      jobDate: ["",Validators.required],
      customerid:["",Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      vehicleNo:["",Validators.required],
      engineNo: ["", Validators.required],
      item: ["", Validators.required],
      qty: ["", Validators.required],
    });

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
    this.router.navigate(['/login']);
  }
  this.getCompletedJobs();
  this.getCustomerDetails();
  }
  clear(){
    this.withdrawalForm.reset();
  }

  getCompletedJobs() {
    const url = "http://localhost:3000/jobs/getCompletedJobs";

    this.http.get<any>(url).subscribe(res => {
      if (res.state === false) {
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Error Try Again !!! ', 'Retry', config);
      } else {
        this.jobs = res.data;
      }
    });
  }

  getCustomerDetails() {
    //this.userid = this.withdrawalForm.value.customerid;
    const url = "http://localhost:3000/users/searchAllUsers"   //backend url

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {

          this.customerData = res.data;

      }
    });

  }
  getNames(){
    this.getCustomers = this.withdrawalForm.value.customerid;
    //this.selectedJob = this.withdrawalForm.value.job;
    if (this.getCustomers.vehicle) {
      this.getCustomers.vehicle = JSON.parse(this.getCustomers.vehicle);
      console.log(this.getCustomers);
    }
  }
  selectJob () {
    this.getData = this.withdrawalForm.value.job;
    //this.selectedJob = this.withdrawalForm.value.job;
    if (this.getData.vehicle) {
      this.getData.vehicle = JSON.parse(this.getData.vehicle);
      console.log(this.getData);
    }
    /*if (this.selectedJob.vehicle) {
      this.selectedJob.vehicle = JSON.parse(this.selectedJob.vehicle);
      console.log(this.selectedJob);
    }*/
  }


}


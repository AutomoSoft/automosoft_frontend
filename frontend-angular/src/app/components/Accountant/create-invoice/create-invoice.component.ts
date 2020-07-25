import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MycookiesService} from '../../Admin/mycookies.service';
import { MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
} from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { element } from 'protractor';

interface customer {
  _id: String;
  vehicles:[];
  usertype: String;
  userid: String;
  firstname: String;
  lastname: String;
  email: String;

}

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
  jobItems;
  jobId;
  getData;
  selectedJob;
  firstName;
  getCustomers;
  customerData:customer[] =[];
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
      po: ["", Validators.required],
      foremanid: ["", Validators.required],
      createdBy: ["", Validators.required],
      job: ["", Validators.required],
      jobDate: ["",Validators.required],
      customerid:["",Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      vehicleNo:["",Validators.required],

      itemDetails: this.fb.array([this.itemDetails]),

      engineNo: ["", Validators.required],
      grandTotal: ["", Validators.required],
      tax: ["", Validators.required],
      subTotal: ["", Validators.required],
      note: ["", Validators.required]
    });

    get itemDetails(): FormGroup {
      return this.fb.group({
        itemNo: ["", Validators.required],
        description: ["", Validators.required],
        qty: ["", Validators.required],
        price: ["", Validators.required],
        totalPrice: ["", Validators.required],
      });
    }
    addVehicle ()
    {
      (this.withdrawalForm.get("itemDetails") as FormArray).push(this.itemDetails);
    }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
    this.router.navigate(['/login']);
  }
  this.getCompletedJobs();
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
    this.userid = this.getData.custId;
    console.log(this.userid);
    const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {

          this.customerData = res.data;
          this.getData.firstName = res.data["firstname"];
          this.getData.lastName = res.data["lastname"];
          //console.log(res.data["firstname"]);
          //console.log(this.withdrawalForm.value.job)

      }
    });

  }

  viewItems(jobId){
    this.jobId = this.getData.jobNo
    console.log(this.jobId);
    const url = "http://localhost:3000/jobs/viewJob"
    this.http.get<any>(url + "/" + jobId).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error", true ? "Retry" : undefined, config);
      } else {
            this.jobItems = res.data.itemsUsed
            //console.log(res.jobItems)
            //console.log(this.job)*/

          //console.log(dialogConfig.data)


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

  public calculateTotal() {
    return this.getData.itemsUsed.reduce((accum, curr) => accum + curr.charge, 0);
  }

  public calculateGrandTotal() {
     const grandTotal = this.withdrawalForm.value.subTotal+ this.withdrawalForm.value.tax/100*this.withdrawalForm.value.subTotal;
     return grandTotal;
  }
  selectJob () {
    this.getData = this.withdrawalForm.value.job;
    this.getCustomerDetails();
    //this.selectedJob = this.withdrawalForm.value.job;
    if (this.getData.vehicle) {
      this.getData.vehicle = JSON.parse(this.getData.vehicle);
      console.log(this.getData.itemsUsed);
    }
  }

  createInvoice() {
    //let date=Date();
    const createInvoice = {
      invoiceNo: this.withdrawalForm.value.invoiceNo,
      invoiceDate: this.withdrawalForm.value.invoiceDate,
      po: this.withdrawalForm.value.po,
      jobNo: this.withdrawalForm.value.job.jobNo,
      jobDate: this.withdrawalForm.value.jobDate,
      custId: this.withdrawalForm.value.customerid,
      firstname: this.withdrawalForm.value.firstName,
      lastName: this.withdrawalForm.value.lastName,
      vehicleNo: this.withdrawalForm.value.vehicleNo,
      engineNo: this.withdrawalForm.value.engineNo,
      itemsUsed: this.getData.itemsUsed,
      subTotal: this.withdrawalForm.value.subTotal,
      tax: this.withdrawalForm.value.tax,
      grandTotal: this.withdrawalForm.value.grandTotal,
      note: this.withdrawalForm.value.note,
      createdBy: this.withdrawalForm.value.createdBy
    };
    console.log(createInvoice);

  var url = "http://localhost:3000/invoice/createInvoice";

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
      this.http.post<any>(url, createInvoice).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          window.location.reload();
          // this.customerForm.reset();
        } else {
          console.log(res.msg);
          alert("Error!! Try Again");
          this.router.navigate([this.cookie.userid,'createInvoice']);
        }
      });
      console.log(createInvoice);
    }
  });

  /*if (this.withdrawalForm.invalid) {
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
      this.http.post<any>(url, createInvoice).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          window.location.reload();
          // this.customerForm.reset();
        } else {
          console.log(res.msg);
          alert("Error!! Try Again");
          this.router.navigate([this.cookie.userid,'createInvoice']);
        }
      });
      console.log(createInvoice);
    }
  });
}*/
  }


}


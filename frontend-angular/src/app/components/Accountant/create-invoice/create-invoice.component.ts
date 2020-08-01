import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from '../../Admin/mycookies.service';
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
  taxRate = 12;                 //edit tax rate here
  paidAmount;                   //paid amount from total bill
  dueBalance;                   //balance remaining to pay

  lastInvString;      //Invoice Number string of last invoice
  lastInvNo;          //Invoice Number of last invoice excluding "INV"
  newInvNo;           //Invoice Number of new Invoice

  constructor( private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,) {
      if (cookies.userData && cookies.userData.userid) {
        this.cookie = cookies.userData.userid;
      }
    }

    invoiceForm = this.fb.group({
      invoiceNo: ["",Validators.required],
      invoiceDate: ["",Validators.required],
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

      paidAmount: ["", Validators.required],      //already paid amount
      dueBalance: ["", Validators.required],      //remaining balance to pay

      amountPaid: ["", Validators.required],      //current paying amount
      newBalance: ["", Validators.required],         //new balance remaining to pay
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
      (this.invoiceForm.get("itemDetails") as FormArray).push(this.itemDetails);
    }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
    this.router.navigate(['/login']);
  }
  this.getCompletedJobs();

// ******************************************** Get Last Invoice Number  ************************************************************

const url = "http://localhost:3000/getLastId/getLastInvoiceNo";

this.http.get<any>(url).subscribe(res => {
  if (res.state == false) {
    let config = new MatSnackBarConfig();
    config.duration = true ? 2000 : 0;
    this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
  } else {

    this.lastInvString = res.data[0].invoiceNo;
    var splitted = this.lastInvString.split("INV", 2);
    this.lastInvNo = parseInt(splitted[1], 10)          //extract the numeric part
    this.newInvNo = this.lastInvNo + 1;
    console.log(this.lastInvNo);
  }
});
  }

  clear(){
    this.invoiceForm.reset();
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
    // console.log(this.userid);
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
          //console.log(this.invoiceForm.value.job)

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
    this.getCustomers = this.invoiceForm.value.customerid;
    //this.selectedJob = this.invoiceForm.value.job;
    if (this.getCustomers.vehicle) {
      this.getCustomers.vehicle = JSON.parse(this.getCustomers.vehicle);
      // console.log(this.getCustomers);
    }
  }

  public calculateTotal() {
    return this.getData.itemsUsed.reduce((accum, curr) => accum + curr.charge, 0);
  }

  public calculateGrandTotal() {
     const grandTotal = this.invoiceForm.value.subTotal+ this.taxRate/100*this.invoiceForm.value.subTotal;
     return grandTotal;
  }

  public calculatepaidAmount() {    //amount already paid
    const paidAmount = this.invoiceForm.value.job.amountPaid;
    return paidAmount;
 }
 public calculatedueBalance() {     //amount remaining to pay
  const dueBalance = this.invoiceForm.value.grandTotal - this.invoiceForm.value.paidAmount;
  return dueBalance;
}
  public calculateremBalance() {    //amount remaining after current paying amount
    const balance = this.invoiceForm.value.dueBalance -this.invoiceForm.value.amountPaid;
    return balance;
 }

  selectJob () {
    this.getData = this.invoiceForm.value.job;
    this.getCustomerDetails();
    this.paidAmount=this.invoiceForm.value.job.amountPaid;
    this.dueBalance=this.invoiceForm.value.job.balance;
    if (this.getData.vehicle) {
      this.getData.vehicle = JSON.parse(this.getData.vehicle);
      // console.log(this.dueBalance);
    }
  }

  createInvoice() {
    let date=Date();
    const createInvoice = {
      invoiceNo: 'INV00'+this.newInvNo,
      invoiceDate: date,
      jobNo: this.invoiceForm.value.job.jobNo,
      jobDate: this.invoiceForm.value.jobDate,
      custId: this.invoiceForm.value.customerid,
      firstname: this.invoiceForm.value.firstName,
      lastName: this.invoiceForm.value.lastName,
      vehicleNo: this.invoiceForm.value.vehicleNo,
      engineNo: this.invoiceForm.value.engineNo,
      itemsUsed: this.getData.itemsUsed,
      subTotal: this.invoiceForm.value.subTotal,
      tax: this.taxRate,
      grandTotal: this.invoiceForm.value.grandTotal,
      amountPaid: this.invoiceForm.value.amountPaid,
      balance: this.invoiceForm.value.newBalance,
      note: this.invoiceForm.value.note,
      createdBy: this.invoiceForm.value.createdBy
    };
    // console.log(createInvoice);

  var url = "http://localhost:3000/invoice/createInvoice";
  var url2 = "http://localhost:3000/jobs/updateCharges";      //update job charges

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
          this.http.post<any>(url2, createInvoice).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              window.location.reload();
            } else {
              console.log(res.msg);
              alert("Error!! Try Again");
              this.router.navigate([this.cookie.userid,'createInvoice']);
            }
          });

        } else {
          console.log(res.msg);
          alert("Error!! Try Again");
          this.router.navigate([this.cookie.userid,'createInvoice']);
        }
      });
      //  console.log(createInvoice);
    }
  });

  }


}


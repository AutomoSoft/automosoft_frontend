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
  selector: 'app-withdraw-stock',
  templateUrl: './withdraw-stock.component.html',
  styleUrls: ['./withdraw-stock.component.scss']
})
export class WithdrawStockComponent implements OnInit {

  cookie;
  userid;
  items = [];
  jobs;
  selectedJob;
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
      foremanid: ["", Validators.required],
      collectedby: ["", Validators.required],
      job: ["", Validators.required],
      customerid:["",Validators.required],
      vehicleNo:["",Validators.required],
      item: ["", Validators.required],
      qty: ["", Validators.required],
    });

save() {
  console.log(this.withdrawalForm.value);
  if (this.withdrawalForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
    let date=Date();

    const form = {
      jobno: this.selectedJob.jobNo,
      customerid: this.selectedJob.custId,
      vehicle: this.selectedJob.vehicle.vehicleRegNo,
      foremanid: this.userid,
      collectedby: this.withdrawalForm.value.technicianid,
      items: this.items
    };

    var url = "http://localhost:3000/items/withdrawStock";


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure want to withraw stock?",
        buttonText: {
          ok: "Yes",
          cancel: "No"
        }
      }
    });
   dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.http.post<any>(url, form).subscribe(res => {
          if (res.state) {
            let config = new MatSnackBarConfig();
            const snackBarRef = this.snackBar.open(res.msg, true ? "OK" : undefined, config);
            snackBarRef.afterDismissed().subscribe(() => {
              window.location.reload();
            });
          } else {
            console.log(res.msg);
            alert("Error!! Try Again");
            this.router.navigate([this.cookie.userid,'withdrawStock']);
          }
        });
      }
    });

    }


  }
clear(){
  this.withdrawalForm.reset();
}

getCurrentJobs() {
  const url = "http://localhost:3000/jobs/getCurrentJobs";

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

  getAllItems() {
    const url = "http://localhost:3000/items/searchAllItems";

    this.http.get<any>(url).subscribe(res => {
      if (res.state === false) {
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Error Try Again !!! ', 'Retry', config);
      } else {
        this.allItems = res.data;
      }
    });
  }

ngOnInit() {
  var temp = this.cookies.getCookie("userAuth");
  if(temp==""){
    this.router.navigate(['/login']);
  }
  this.getCurrentJobs();
  this.getAllItems();
}

addItem() {
  const newItemId = this.withdrawalForm.value.item.itemid;
  console.log(this.withdrawalForm.value.item);
  const newQty = this.withdrawalForm.value.qty;
  let notFound = true;
  this.items = this.items.map((itemObject) => {
    const itemId = itemObject.itemId;
    const qty = itemObject.qty;
    if (itemId === newItemId) {
      notFound = false;
      itemObject.qty = parseInt(qty, 10) + parseInt(newQty, 10);
    }
    return itemObject;
  });
  if (notFound) {
    this.items.push({ itemId: newItemId, qty: newQty });
  }
  console.log(this.items);
}  

removeItem() {
  const newItemId = this.withdrawalForm.value.item.itemid;
  const newQty = this.withdrawalForm.value.qty;
  let itemIndex = -1;
  let shouldRemove = false;
  this.items = this.items.map((itemObject, index) => {
    const itemId = itemObject.itemId;
    const qty = itemObject.qty;
    if (itemId === newItemId) {
      itemIndex = index;
      if (qty <= newQty) {
        shouldRemove = true;
      } else {
        itemObject.qty = parseInt(qty, 10) - parseInt(newQty, 10);
      }
    }
    return itemObject;
  });

  if (shouldRemove) {
    this.items.splice(itemIndex, 1);
  }
}


selectJob () {
  this.selectedJob = this.withdrawalForm.value.job;
  if (this.selectedJob.vehicle) {
    this.selectedJob.vehicle = JSON.parse(this.selectedJob.vehicle);
    console.log(this.selectedJob);
  }
}
}

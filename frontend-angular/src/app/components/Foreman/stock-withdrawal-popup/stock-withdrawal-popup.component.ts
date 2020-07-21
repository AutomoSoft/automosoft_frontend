import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import {
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-stock-withdrawal-popup',
  templateUrl: './stock-withdrawal-popup.component.html',
  styleUrls: ['./stock-withdrawal-popup.component.scss']
})
export class StockWithdrawalPopupComponent implements OnInit {

  job: any;
  cookie;
  allItems = [];      //items in a selected category
  items = [];         //items added to the job

  constructor(
    public dialogRef: MatDialogRef<StockWithdrawalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,

    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.job = data.job;
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    // console.log(this.job);
     //console.log(this.cookie);
   }

   withdrawalForm = this.fb.group({
    foremanid: [""],
    collectedby: ["", Validators.required],
    job: [""],
    customerid:[""],
    vehicleNo:[""],
    itemtype: ["", Validators.required],
    item: ["", Validators.required],
    qty: ["", Validators.required],
  });


   selectItemType(category){

    // console.log(category)
    const url = "http://localhost:3000/items/categorizeItems";

    this.http.get<any>(url + "/" + category).subscribe(res => {
      if (res.state === false) {
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Error Try Again !!! ', 'Retry', config);
      } else {
        this.allItems = res.data;
        // console.log(this.allItems)
      }
    });
  }

  addItem() {
    const newItemId = this.withdrawalForm.value.item.itemid;
    const newItemType = this.withdrawalForm.value.itemtype;
    const newQty = this.withdrawalForm.value.qty;
    const newcharge = this.withdrawalForm.value.item.selling*this.withdrawalForm.value.qty;


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
      this.items.push({ itemId: newItemId,itemtype: newItemType, qty: newQty, charge: newcharge });
    }
    // console.log(this.items);
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
    // console.log(this.items);
  }


  save() {

    if (this.withdrawalForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }else {
      let date=Date();

      const form = {
        jobNo: this.job.jobNo,
        customerid: this.job.custId,
        vehicle: JSON.parse(this.job.vehicle).vehicleRegNo,
        foremanid: this.cookie.userid,
        collectedby: this.withdrawalForm.value.collectedby,
        items: this.items,
        date: date,
      };

      //  console.log(form);

     var url1 = "http://localhost:3000/items/withdrawStock";  //withdraw stock from store
     var url2 = "http://localhost:3000/jobs/addJobItems";     //add used items for a particular job


      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: "Are you sure want to withraw Stock?",
          buttonText: {
            ok: "Yes",
            cancel: "No"
          }
        }
      });
     dialogRef.afterClosed().subscribe((confirmed: boolean) => {

        if (confirmed) {
          this.http.post<any>(url1, form).subscribe(res => {
            if (res.state) {

              this.http.post<any>(url2, form).subscribe(res => {
                if (res.state) {
                  let config = new MatSnackBarConfig();
                  const snackBarRef = this.snackBar.open(res.msg, true ? "OK" : undefined, config);
                  snackBarRef.afterDismissed().subscribe(() => {
                    window.location.reload();
                  });

                } else {
                  console.log(res.msg);
                  alert("Error!! Try Again");
                  //this.router.navigate([this.cookie.userid,'ongoingJobs']);
                }
              });

            } else {
              console.log(res.msg);
              alert("Error!! Try Again");
              //this.router.navigate([this.cookie.userid,'ongoingJobs']);
            }
          });
        }
      });

      }


    }

    cancel(){
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}

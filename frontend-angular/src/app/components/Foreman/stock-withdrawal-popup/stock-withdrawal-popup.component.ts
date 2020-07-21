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
    foremanid: ["", Validators.required],
    collectedby: ["", Validators.required],
    job: ["", Validators.required],
    customerid:["",Validators.required],
    vehicleNo:["",Validators.required],
    itemtype: ["", Validators.required],
    item: ["", Validators.required],
    qty: ["", Validators.required],
  });


   selectItemType(category){

    console.log(category)
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
    const newItemId = this.withdrawalForm.value.item;
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
    const newItemId = this.withdrawalForm.value.item;
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
    console.log(this.items);
  }

  ngOnInit() {
  }

}

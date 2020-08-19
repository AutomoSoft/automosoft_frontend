import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { NewPurchaseOrderComponent } from './new-purchase-order/new-purchase-order.component';

import {  
  PURCHASE_ORDERS
} from '../../../constants/index';

@Component({
  selector: 'app-purchase-order-requests',
  templateUrl: './purchase-order-requests.component.html',
  styleUrls: ['./purchase-order-requests.component.scss']
})
export class PurchaseOrderRequestsComponent implements OnInit {

  approvedOrders;
  cookie;
  PURCHASE_ORDERS = PURCHASE_ORDERS;
  pendingOrders;
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
  }

  ngOnInit() { 
    this.fetchApprovedOrders();
    this.fetchPendingOrders(); 
  }

  fetchApprovedOrders() {
    const url = `http://localhost:3000/purchaseOrders/fetchOrdersByStatus?status=${PURCHASE_ORDERS.ORDER_STATUS.APPROVED}`;

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {
        this.approvedOrders = res.data;
      }
    });
  }

  fetchPendingOrders() {
    const url = `http://localhost:3000/purchaseOrders/fetchOrdersByStatus?status=${PURCHASE_ORDERS.ORDER_STATUS.REQUESTED}`;

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {
        this.pendingOrders = res.data;
      }
    });

  }

  markReceived(order) {
    const data ={
      id: order._id
    };

    const url = "http://localhost:3000/purchaseOrders/markReceived";

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure want to mark this order as received?",
        buttonText: {
          ok: "Yes",
          cancel: "No"
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.http.put<any>(url, data).subscribe(res => {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          if (res.state === false) {
            this.snackBar.open(res.msg, true ? "Retry" : undefined, config);
          } else {
            this.snackBar.open(res.msg, true ? "Ok" : undefined, config);
          }
          this.fetchPendingOrders();
        });
      }
    });

  }

  sendOrder(order) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
       itemid: order.itemid,
       quantity: order.quantity,
       purchaseOrderID: order._id
    };
    const dialogRef = this.dialog.open(NewPurchaseOrderComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.fetchApprovedOrders();
        this.fetchPendingOrders();
      }
    });
}

}
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { NewPurchaseOrderComponent } from './new-purchase-order/new-purchase-order.component';

@Component({
  selector: 'app-purchase-order-requests',
  templateUrl: './purchase-order-requests.component.html',
  styleUrls: ['./purchase-order-requests.component.scss']
})
export class PurchaseOrderRequestsComponent implements OnInit {

  approvedOrders;
  cookie;

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

    const url = "http://localhost:3000/purchaseOrders/fetchOrdersByStatus?status=1";

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

  sendOrder(k) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
       itemid:k.itemid,
       quantity:k.quantity,
       purchaseOrderID:k._id     
    };
  const dialogRef = this.dialog.open(NewPurchaseOrderComponent,dialogConfig);
}
 
}

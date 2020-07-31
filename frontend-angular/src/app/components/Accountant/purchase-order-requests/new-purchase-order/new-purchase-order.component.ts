import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PurchaseOrderRequestsComponent } from '../purchase-order-requests.component';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from 'src/app/components/Admin/mycookies.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-new-purchase-order',
  templateUrl: './new-purchase-order.component.html',
  styleUrls: ['./new-purchase-order.component.scss']
})
export class NewPurchaseOrderComponent implements OnInit {

  
  cookie;
  item;
  suppliers;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PurchaseOrderRequestsComponent>,

    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {

    var url =  "http://localhost:3000/supplier/searchAllSuppliers";

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {
        this.suppliers = res.data;
      }
    });
   
  }
  close() {
    this.dialogRef.close();
  }
   
  sendEmail(supplier) {

      const formData = {
        purchaseOrderid: this.data.purchaseOrderID,
        itemid: this.data.itemid,
        quantity: this.data.quantity,
        supplierid: supplier._id, 
      };
      
      var url = "http://localhost:3000/purchaseOrders/sendEmail";

      this.http.post<any>(url, formData).subscribe(res => {
        if (res.state) {
          let config = new MatSnackBarConfig();
          const snackBarRef = this.snackBar.open(res.msg, true ? "OK" : undefined, config);
          snackBarRef.afterDismissed().subscribe(() => {
            window.location.reload();
          });

        } else {
          console.log(res.msg);
          alert("Error!! Try Again");

        }
      });

    }
}


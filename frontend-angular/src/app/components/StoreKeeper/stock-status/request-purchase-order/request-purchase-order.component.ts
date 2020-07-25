import { Component, OnInit, Inject } from '@angular/core';
import { StockStatusComponent } from '../stock-status.component';
import { Router } from "@angular/router";

import { MycookiesService } from "../../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpClient } from "@angular/common/http"; import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../../Auth/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'app-request-purchase-order',
  templateUrl: './request-purchase-order.component.html',
  styleUrls: ['./request-purchase-order.component.scss']
})
export class RequestPurchaseOrderComponent implements OnInit {


  cookie;
  item;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StockStatusComponent>,

    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.item = data.item;
    console.log(this.item);
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }

  }

  requestQuantityForm = this.fb.group({
    quantity: ["", Validators.required],
  });


  ngOnInit() {
  }

  requestQuantity() {

    if (this.requestQuantityForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    } else {
      const formData = {
        quantity: this.requestQuantityForm.value.quantity,
        itemid: this.item.itemid,
        userid: this.data.user.userid
      };
      
      var url = "http://localhost:3000/purchaseOrders/requestQuantity";

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
  reset() {
    this.requestQuantityForm.reset();
  }

}

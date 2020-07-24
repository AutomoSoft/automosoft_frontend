import { Component, OnInit, Inject } from '@angular/core';
import { StockStatusComponent } from '../stock-status.component';
import { Router } from "@angular/router";

import { MycookiesService } from "../../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpClient } from "@angular/common/http";import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../../Auth/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'app-request-purchase-oder',
  templateUrl: './request-purchase-oder.component.html',
  styleUrls: ['./request-purchase-oder.component.scss']
})
export class RequestPurchaseOderComponent implements OnInit {

  
  cookie;

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
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
  
}

requestQuantityForm = this.fb.group({
  quantity: ["", Validators.required],
});


  ngOnInit() {
  }

  requestQuantity(){

    if (this.requestQuantityForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }else {
      const formData = new FormData();
          //append the data to the form
          formData.append('quantity', this.requestQuantityForm.value.quantity)
         
  
  
    var url = "http://localhost:3000/purchaseOrders/requestQuantity";

  }
}
  reset(){
      this.requestQuantityForm.reset();
  }

}

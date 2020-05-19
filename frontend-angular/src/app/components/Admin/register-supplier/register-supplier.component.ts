import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  NgForm,
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";

export interface Item {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss']
})
export class RegisterSupplierComponent implements OnInit {

  cookie;

  items: Item[] = [
    {value: 'spare-parts-0', viewValue: 'Spare-Parts'},
    {value: 'tool-1', viewValue: 'Tools'},
    {value: 'paint-2', viewValue: 'Paint'}
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
  }

  supplierForm = this.fb.group({
    supid: ["", Validators.required],
    supname: ["", Validators.required],
    address: ["", Validators.required],
    contactNo: ["", Validators.required],
    // email: ["", Validators.required],
    itemtype: ["", Validators.required],
    itemid: ["", Validators.required],
    brand: ["", Validators.required],
    note: ["", Validators.required],

  });

  addSupplier() {
    let date=Date();
    const registerSupplier = {
      usertype : "Supplier",
      supid: this.supplierForm.value.supid,
      supname: this.supplierForm.value.supname,
      address: this.supplierForm.value.address,
      contactnumber: this.supplierForm.value.contactNo,
      // email: this.supplierForm.value.email,
      itemtype: this.supplierForm.value.itemtype,
      itemid: this.supplierForm.value.itemid,
      brand: this.supplierForm.value.brand,
      note: this.supplierForm.value.note,
      addedby: this.cookie.userid,
      addedon: date,
    };

  var url = "http://localhost:3000/supplier/registerSupplier";

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
      this.http.post<any>(url, registerSupplier).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          window.location.reload();
          // this.customerForm.reset();
        } else {
          console.log(res.msg);
          alert("Error!! Try Again");
          this.router.navigate([this.cookie.userid,'registerSupplier']);
        }
      });
      console.log(registerSupplier);
    }
  });
  }
  reset(){
    this.supplierForm.reset();
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }



  }

  ngOnInit() {
  }

}

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

//


@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss']
})
export class RegisterSupplierComponent implements OnInit {

  cookie;
  flag1 = false;    //show/hide form fields
  itemCat;       //filter items
  selectedItems;   //registered items from selected category

  items: Item[] = [
    {value: 'Spare Part', viewValue: 'Spare-Parts'},
    {value: 'Tool', viewValue: 'Tools'},
    {value: 'Paint', viewValue: 'Paint'}
  ];

  constructor(
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

  supplierForm = this.fb.group({
    supDetails: this.fb.group({
    supid: ["", Validators.required],
    supname: ["", Validators.required],
    email:["", Validators.required],
    address: ["", Validators.required],
    contactNo: ["", Validators.required],
    }),
    supitem: this.fb.array([this.supitem]),
    note: [""],

  });

  get supitem(): FormGroup {
    return this.fb.group({
      itemtype: ["", Validators.required],
      itemid: ["", Validators.required],
      brand: ["", Validators.required],
    });
  }

  addItem() {
    (this.supplierForm.get("supitem") as FormArray).push(this.supitem);

  }


  addSupplier() {
    let date=Date();
    const registerSupplier = {
      usertype : "Supplier",
      supid: this.supplierForm.value.supDetails.supid,
      supname: this.supplierForm.value.supDetails.supname,
      address: this.supplierForm.value.supDetails.address,
      contactnumber: this.supplierForm.value.supDetails.contactNo,
      email: this.supplierForm.value.supDetails.email,
      item: this.supplierForm.value.supitem,
      note: this.supplierForm.value.note,
      addedby: this.cookie.userid,
      addedon: date,
    };

  var url = "http://localhost:3000/supplier/registerSupplier";

  if (this.supplierForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
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
  }

  selectItems(category){

    //console.log(category)
    const url = "http://localhost:3000/items/getItems";

    this.http.get<any>(url + "/" + category).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error !!! Please Check Item Category", true ? "Retry" : undefined, config);
      } else {
        this.flag1 = true;
        //console.log(res.data);
        this.selectedItems = res.data;

  //
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
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
  }

}

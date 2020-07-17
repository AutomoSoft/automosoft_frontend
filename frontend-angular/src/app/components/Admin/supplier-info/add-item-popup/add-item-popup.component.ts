import { Component, OnInit, Inject } from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../mycookies.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../Auth/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-item-popup',
  templateUrl: './add-item-popup.component.html',
  styleUrls: ['./add-item-popup.component.scss']
})
export class AddItemPopupComponent implements OnInit {

  [x: string]: any;
  supplier: String;

  replyForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddItemPopupComponent>,

    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.supplier = data.sup;
    //console.log(this.supplier)
  }

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
  }

}

get items(): FormGroup {
  return this.fb.group({
    itemtype: ["", Validators.required],
    itemid: ["", Validators.required],
    brand: ["", Validators.required],
  });
}

itemForm = this.fb.group({
  items: this.fb.array([this.items]),
});

addnewItem(){

  let date=Date();
  const newItem = {
    supid: this.supplier,
    item: this.itemForm.value.items,
    lastmodifiedby: this.cookie.userid,
    lastmodifiedon: date,
  };

var url = "http://localhost:3000/supplier/addNewItem";

if (this.itemForm.invalid) {
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
    this.http.post<any>(url, newItem).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        window.location.reload();
      } else {
        console.log(res.msg);
        alert("Error!! Try Again");
        this.router.navigate([this.cookie.userid,'supplierInfo']);
      }
    });
    //console.log(newItem);
  }
});
}




  }


onNoClick(): void {
    this.dialogRef.close(false);

  }

}










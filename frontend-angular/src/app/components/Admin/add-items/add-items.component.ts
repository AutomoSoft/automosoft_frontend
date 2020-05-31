import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  images;
  filename;
  cookie;

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

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }


  }

  itemForm = this.fb.group({
    itemtype: ["", Validators.required],
    itemid: ["", Validators.required],
    itemName: ["", Validators.required],
    buying: ["", Validators.required],
    selling: ["", Validators.required],

  });

  //button event to upload profile image
selectImage(event) {
  if (event.target.files.length > 0) {  // check if file selected.
    const file = event.target.files[0];
    this.images = file;
    this.filename = file.name;
    //console.log(file);
  }
}

addItem() {

  if (this.itemForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
    let date=Date();
    const formData = new FormData();
        //append the data to the form
        formData.append('itemImage', this.images)
        formData.append('itemtype', this.itemForm.value.itemtype)
        formData.append('itemid', this.itemForm.value.itemid)
        formData.append('itemName', this.itemForm.value.itemName)
        formData.append('buying', this.itemForm.value.buying)
        formData.append('selling', this.itemForm.value.selling)
        formData.append('addedby',  this.cookie.userid)
        formData.append('addedon', date)
        formData.append('lastmodifiedby',  "Never Modified")
        formData.append('lastmodifiedon', date)



    var url = "http://localhost:3000/items/registerItem";

    if (this.images == null) {  //check profile image select or not
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please select a item image..! ", true ? "OK" : undefined, config);
    }else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: "Are you sure want to Add?",
          buttonText: {
            ok: "Yes",
            cancel: "No"
          }
        },
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {

        if (confirmed) {
          this.http.post<any>(url, formData).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              window.location.reload();

            } else {
              console.log(res.msg);
              alert("Error!! Try Again");
              this.router.navigate([this.cookie.userid,'AddItems']);
            }
          });
          console.log(formData);
        }
      });

    }


  }



}



}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";

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
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  cookie;
  flag1 = false;    //show/hide form fields
  itemCat;       //filter items
  selectedItems;   //registered items from selected category

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }

  addStockForm = this.fb.group({
    itemType: ["", Validators.required],
    itemId: ["", Validators.required],
    quantity: ["", Validators.required]


  });

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
    }
  }

  // ******************************************** Select Item Category ********************************************************


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


    }
  });
}

 // ******************************************** Add stock to Store ********************************************************

 addStock() {

  let date=Date();
  const stock = {
    itemType : this.addStockForm.value.itemType,
    itemId: this.addStockForm.value.itemId,
    quantity: this.addStockForm.value.quantity,
    lastmodifiedby: this.cookie.userid,
    lastmodifiedon: date,
  };

    var url = "http://localhost:3000/items/addStock";

    if (this.addStockForm.invalid) {
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
        this.http.post<any>(url, stock).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            window.location.reload();
          } else {
            console.log(res.msg);
            alert("Error!! Try Again");
            //this.router.navigate(['createJob']);
          }
        });
        //console.log(stock);
      }
    });
    }
}

}

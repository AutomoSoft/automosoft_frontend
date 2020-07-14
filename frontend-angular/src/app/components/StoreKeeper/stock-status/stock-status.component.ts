import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";
import { StockReportComponent } from '../stock-report/stock-report.component';
import { RequestPurchaseOderComponent } from '../request-purchase-oder/request-purchase-oder.component';


interface item {
  _id: String;
  itemtype: String;
  itemid: String;
  buying: String;
  selling: String;
  addedby: String;
  addedon: String;
  storequantity:Number;
  lastmodifiedby: String;
  lastmodifiedon: String;
  filepath: String;
}

//table data
export interface PeriodicElement {
  itemid: String;
  itemtype: String;
  itemname: String;
  buying: String;
  selling: String;
  addedby: String;
  addedon: String;
  storequantity: Number;
  lastmodifiedby: String;
  lastmodifiedon: String;
}

@Component({
  selector: 'app-stock-status',
  templateUrl: './stock-status.component.html',
  styleUrls: ['./stock-status.component.scss']
})
export class StockStatusComponent implements OnInit {

  displayedColumns: string[] = ['itemid', 'itemname', 'buying', 'selling', 'storequantity', 'action'];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;

  itemdata: item[] = [];
  itemSearchForm: FormGroup;
  itemDataForm: FormGroup;
  userid;
  itemid;
  cookie;
  dataform: Boolean = false;
  propicName;  //profile picture name
  itemtype;        // filter item
  searchText;
  custVehicles;
  userflag: Boolean = false;  //to show/hide customer vehicle fields

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

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if (cookie == "") {
      this.router.navigate(['/login']);
    }

    this.itemSearchForm = this.fb.group({
      itemid: ['', Validators.required]
    });

    this.itemDataForm = this.fb.group({
      itemtype: ["", Validators.required],
      itemid: ["", Validators.required],
      itemname: ["", Validators.required],
      buying: ["", Validators.required],
      selling: ["", Validators.required],
      addedby: ["", Validators.required],
      addedon: ["", Validators.required],
      storequantity:["", Validators.required],
      lastmodifiedon: ["", Validators.required],
      lastmodifiedby: ["", Validators.required],
      //vehicles: this.fb.array([this.custVehicles]),
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });



    /*************************************************** Table Data(All Items) ***********************************************************/

    const url = "http://localhost:3000/items/searchAllItems"   //backend url

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error...! ", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA = res.data;   //add response data in to data array
        //this.propicName = res.data.filepath;
        console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
      }
    });
  }

  /*************************************************** Search Item  ***********************************************************/

  searchItem() {
    this.itemid = this.itemSearchForm.value.itemid; //get supplier id

    const url = "http://localhost:3000/items/searchItembyId"   //backend url

    this.http.get<any>(url + "/" + this.itemid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Item Not Found..! ", true ? "Retry" : undefined, config);
      } else {
        this.dataform = true; //data form div show
        this.itemdata = res.data;   //add response data in to datadata array
        console.log(this.itemdata)
      }
    });
  }

  resetSearch() {
    this.itemSearchForm.reset();
  }

  back() {
    this.dataform = false; //data form div hide
    this.itemSearchForm.reset(); // clear the input fields
  }


  // ******************************************** View Items Category Wise ********************************************************

//search items from relavant category
selectItem(category){

  console.log(category)
  const url = "http://localhost:3000/items/categorizeItems";

  this.http.get<any>(url + "/" + category).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! Please check the Item Category", true ? "Retry" : undefined, config);
    } else {
      this.TABLE_DATA = res.data;   //add response data in to data array
        //this.propicName = res.data.filepath;
        console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);

    }
  });
}



  viewReport() {
    const dialogRef = this.dialog.open(StockReportComponent, {
      width: '640px'
    });
  }

  requestItem() {
    const dialogRef = this.dialog.open(RequestPurchaseOderComponent);
  }

}

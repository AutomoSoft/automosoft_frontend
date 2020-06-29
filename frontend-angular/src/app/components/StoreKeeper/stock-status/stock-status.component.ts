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


interface user {
  _id: String;
  itemtype: String;
  itemid: String;
  buying: String;
  selling: String;
  addedby: String;
  addedon: String;
  lastmodifiedby: String;
  lastmodifiedon: String;
  filepath: String;
}

//table data
export interface PeriodicElement {
  itemid: String;
  itemtype: String;
  buying: String;
  selling: String;
  addedby: String;
  addedon: String;
  lastmodifiedby: String;
  lastmodifiedon: String;
}

@Component({
  selector: 'app-stock-status',
  templateUrl: './stock-status.component.html',
  styleUrls: ['./stock-status.component.scss']
})
export class StockStatusComponent implements OnInit {

  displayedColumns: string[] = ['userid', 'usertype','firstname', 'email', 'contactnumber','action'];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;

  userdata: user[] = [];
  itemSearchForm: FormGroup;
  itemDataForm: FormGroup;
  userid;
  cookie;
  dataform: Boolean = false;
  propicName;  //profile picture name
  searchText;
  custVehicles;
  userflag:Boolean = false;  //to show/hide customer vehicle fields

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
    if(cookie==""){
      this.router.navigate(['/login']);
    }

    this.itemSearchForm = this.fb.group({
      userid: ['', Validators.required]
    });

    this.itemDataForm = this.fb.group({
      itemtype: ["", Validators.required],
      itemid: ["", Validators.required],
      buying: ["", Validators.required],
      selling: ["", Validators.required],
      addedby:["", Validators.required],
      addedon: ["", Validators.required],
      lastmodifiedon: ["", Validators.required],
      lastmodifiedby: ["", Validators.required],
      vehicles: this.fb.array([this.custVehicles]),
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


  

}

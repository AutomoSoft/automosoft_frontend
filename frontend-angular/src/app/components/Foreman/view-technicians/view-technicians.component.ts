import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig,MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';

interface technician {
  _id: String;
  vehicles:[];
  usertype: String;
  userid: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  contactnumber: String;
  gender: String;
  nicnumber: String;
  address: String;
  expertise: String;
  capacity: String;
  addedby: String;
  addedon: String;
  lastmodifiedby: String;
  lastmodifiedon: String;
  filepath: String;
}

//table data
export interface PeriodicElement {
  userid: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  contactnumber: String;
  gender: String;
  nicnumber: String;
  address: String;
  expertise: String;
  capacity: String;
}

@Component({
  selector: 'app-view-technicians',
  templateUrl: './view-technicians.component.html',
  styleUrls: ['./view-technicians.component.scss']
})
export class ViewTechniciansComponent implements OnInit {
  displayedColumns: string[] = ['userid', 'firstname','lastname', 'capacity', 'currentjobCap','action'];
  cookie;
  flag2 = false;  //show technicians section
  jobCat;        // filter technicians
  techExpertise: [];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;
  dataform: Boolean = false;

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
  }


// ******************************************** View Technicians Category Wise ********************************************************

//search tecnicians from relavant category
selectTechnician(category){

  console.log(category)
  const url = "http://localhost:3000/technician/getTechnicians";

  this.http.get<any>(url + "/" + category).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! Please Check Job Category", true ? "Retry" : undefined, config);
    } else {
      //  this.flag2 = true;
      // //console.log(res.data);
      // this.techExpertise = res.data;

      this.TABLE_DATA = res.data;   //add response data in to data array
      //this.propicName = res.data.filepath;
      console.log(this.TABLE_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);

    }
  });
}
}

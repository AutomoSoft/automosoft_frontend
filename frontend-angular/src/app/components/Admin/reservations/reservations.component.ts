import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatTableDataSource, MatDialogConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';

interface reservation {
  custID: String;
  daterequested: String;
  time: String;
  repairtype: String;
  problembrief: String;
  status: String;
}

//table data
export interface PeriodicElement {
  _id: String;
  custID: String;
  dateposted: String;
  daterequested: String;
  time: String;
  repairtype: String;
  problembrief: String;
  status: String;
  dateaccepted: String;
  foremanid: String;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  displayedColumns_1: string[] = ['repairtype', 'daterequested','time','problembrief', 'dateposted']; // Table Columns will displayed according to this order
  displayedColumns_2: string[] = ['repairtype', 'daterequested','time','problembrief', 'dateaccepted',"foremanid"]; // Table Columns will displayed according to this order
  cookie;
  TABLE_DATA_1: PeriodicElement[] = [];
  TABLE_DATA_2: PeriodicElement[] = [];
  dataSource_1;
  dataSource_2;
  repairtype_1: String;
  repairtype_2: String;

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
    if (temp == "") {
      this.router.navigate(['/login']);
    }

    // *************************************************** Get All Pending Reservation Requests OnInit********************************************************

    const url = "http://localhost:3000/reservations/viewAllPendingReservations";

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.TABLE_DATA_1 = res.data;
        //console.log(this.TABLE_DATA);
        this.dataSource_1 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_1);
      }
    });

  // *************************************************** Get All Accepted Reservation Requests OnInit********************************************************

    const url_2 = "http://localhost:3000/reservations/viewAllAcceptedReservations";

    this.http.get<any>(url_2).subscribe(res_2 => {
      if (res_2.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.TABLE_DATA_2 = res_2.data;
        //console.log(this.TABLE_DATA);
        this.dataSource_2 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_2);
      }
    });
  }


  //******************************************** View Reservations Job Category Wise ********************************************************

  selectJob_1(category){

    console.log(category)

    const url = "http://localhost:3000/reservations/getReservations"; 

    this.http.get<any>(url + "/" + category).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error !!! Please check the Item Category", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA_1 = res.data;   //add response data in to data array
          console.log(this.TABLE_DATA_1);
          this.dataSource_1 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_1);

      }
    });
    

  }

    //******************************************** View All Accepted Reservations Job Category Wise ********************************************************

    selectJob_2(category){

      console.log(category)
  
      const url = "http://localhost:3000/reservations/getAcceptedReservations"; 
  
      this.http.get<any>(url + "/" + category).subscribe(res => {
        if (res.state == false) {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Error !!! Please check the Item Category", true ? "Retry" : undefined, config);
        } else {
          this.TABLE_DATA_2 = res.data;   //add response data in to data array
            console.log(this.TABLE_DATA_2);
            this.dataSource_2 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_2);
  
        }
      });
      
  
    }

}



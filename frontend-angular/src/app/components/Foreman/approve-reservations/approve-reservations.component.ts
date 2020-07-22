import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig,MatTableDataSource, MatDialogConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import {ApproveReservationsPopupComponent} from "./approve-reservations-popup/approve-reservations-popup.component";

interface reservation{
    _id: String;
    custID: String;
    dateposted: String;
    daterequested:String;
    time: String;
    repairtype: String;
    problembrief: String;
    status: String;
}

interface user {
  _id: String;
  usertype: String;
  userid: String;
  firstname: String;
  lastname: String;
  gender: String;
  nicnumber: String;
  address: String;
  contactnumber: String;
  email: String;
  password: String;
  addedon: String;
  lastmodifiedon: String;
  lastmodifiedby: String;
  vehicles: [];
  // filepath: String;
}

//table data
export interface PeriodicElement {
    _id: String;
    custID: String;
    dateposted: String;
    daterequested:String;
    time: String;
    repairtype: String;
    problembrief: String;
}

@Component({
  selector: 'app-approve-reservations',
  templateUrl: './approve-reservations.component.html',
  styleUrls: ['./approve-reservations.component.scss']
})
export class ApproveReservationsComponent implements OnInit {

  displayedColumns: string[] = ['repairtype', 'daterequested','time','problembrief', 'action']; // Table Columns will displayed according to this order
  cookie;
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;
  repairtype: String;
  custID: String;
  customerdata: user[] = [];
  
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

        this.TABLE_DATA = res.data;
        //console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
      }
    });
  }


  //******************************************** View Reservations Job Category Wise ********************************************************

  selectJob(category){

    console.log(category)

    const url = "http://localhost:3000/reservations/getReservations"; 

    this.http.get<any>(url + "/" + category).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error !!! Please check the Item Category", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA = res.data;   //add response data in to data array
          console.log(this.TABLE_DATA);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);

      }
    });
    

  }

  //****************************************************** View Reservations Popup  ****************************************************************

  viewReservation(element){
    this.custID = element.custID;

    const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + this.custID).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        // if (res.data.usertype == "Customer") {
        //   this.userflag = true;
        // }
        this.customerdata = res.data;   //add response data in to datadata array
        const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    customerData: this.customerdata,
                    reservationID: element._id,   
                };
        this.dialog.open(ApproveReservationsPopupComponent, dialogConfig);        
      }
    });
  }

}

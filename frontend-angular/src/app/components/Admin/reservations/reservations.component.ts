import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig,MatTableDataSource, MatDialogConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';

interface reservation{
  custID: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
  status: String;
}

//table data
export interface PeriodicElement {
custID: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
  status: String;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  displayedColumns: string[] = ['customerid', 'repairtype', 'daterequested','time','problembrief','status']; // Table Columns will displayed according to this order
  cookie;
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;

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

    // *************************************************** Get All Reservations ********************************************************

    const url = "http://localhost:3000/reservations/viewAllReservations";

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

}

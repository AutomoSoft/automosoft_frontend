import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';

interface user {
  _id: String;
  usertype: String;
  userid: String;
  vehicles: String;
  filepath: String;
}

interface job {
  _id: String;
  jobNo: String;
  jobType: String;
  custId: String;
  jobStatus: String;
  technicians: String;
  itemsUsed: String;
  vehicle: String;
}

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})


export class ViewHistoryComponent implements OnInit {

  cookie;
  jobHis;   //job history
  userdata: user[] = [];
  job: job[] = [];
  userid;
  flag1 = false;  //show select vehicles field
  flag2 = false;  //show technicians section
  custID;
  custVehicles;

  constructor(
    private router: Router,
    private http: HttpClient,
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


    const url = "http://localhost:3000/jobs/viewServices";

    this.http.get<any>(url + "/" + this.cookie.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.jobHis = res.data;
        this.custVehicles= res.data.jobNo;
        console.log(res.data["jobStatus"]);


      }
    });


  }


}

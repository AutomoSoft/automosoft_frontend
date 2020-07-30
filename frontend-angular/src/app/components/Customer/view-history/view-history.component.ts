import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { JobDetailsComponent } from './job-details/job-details.component';

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
  vehicles;
  jobDetails;
  jobHis;   //job history
  userdata: user[] = [];
  job: job[] = [];
  userid;
  flag1 = false;  //show select vehicles field
  flag2 = false;  //show technicians section
  custID;
  custVehicles;
  jobNo;

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
    this.jobHistory();

  }
  jobHistory(){
    const url = "http://localhost:3000/jobs/viewServices";

    this.http.get<any>(url + "/" + this.cookie.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.jobHis = res.data;


        /*for(let v in res.data){
          var cusV= res.data[v].vehicle;
          console.log(JSON.parse(cusV));
          //console.log(v.vehicle.vehicleRegNo);

        }*/
        res.data.forEach(element => {
          //console.log(JSON.parse(element.vehicle));
          element.vehicle = JSON.parse(element.vehicle);

        });




        //console.log(res.data["jobStatus"]);
        //console.log(res.data[0].vehicle);



      }
    });

  }

  viewJob(element){



    //console.log(element.jobNo);

    const url = "http://localhost:3000/jobs/viewJob";

    this.http.get<any>(url + "/" + element.jobNo).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.jobDetails = res.data;

        this.vehicles = JSON.parse(res.data.vehicle);
        console.log(this.vehicles);
        /*res.data.forEach(element => {
          console.log(JSON.parse(element.vehicle));
          element.vehicle = JSON.parse(element.vehicle);

        });*/


        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {

          jobDetails: this.jobDetails,
          vehicles: this.vehicles


      };
      console.log(dialogConfig.data)
      this.dialog.open(JobDetailsComponent, dialogConfig);


      }
    });



  }


}

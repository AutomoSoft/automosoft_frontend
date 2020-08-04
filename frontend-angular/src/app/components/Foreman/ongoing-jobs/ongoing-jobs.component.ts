import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { ViewJobComponent } from './view-job/view-job.component';

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
}

@Component({
  selector: 'app-ongoing-jobs',
  templateUrl: './ongoing-jobs.component.html',
  styleUrls: ['./ongoing-jobs.component.scss']
})
export class OngoingJobsComponent implements OnInit {

  cookie;
  currJobs;   //ongoing jobs
  queuedJobs: job[] = [];    //queued jobs
  startedJobs: job[] = [];    //started jobs
  halfJobs : job[] = [];       //halfway completed
  userdata: user[] = [];
  job: job[] = [];
  userid;

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

    // *************************************************** Get Ongoing Jobs ********************************************************

    const url = "http://localhost:3000/jobs/getOngoingJobs";

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.currJobs = res.data;
        // console.log(this.currJobs);
        this.currJobs.forEach(element => {
          if(element.jobStatus == "Queued"){
            this.queuedJobs.push(element)
          } else if(element.jobStatus == "Started"){
          this.startedJobs.push(element)
          } else if(element.jobStatus == "Halfway"){
            this.halfJobs.push(element)
          }

        });
        // console.log(this.queuedJobs)

      }
    });
  }

  viewCard(element) {

  this.userid = element.custId;
  console.log(element.jobNo)

  const url = "http://localhost:3000/users/searchUsers"   //backend url

  this.http.get<any>(url + "/" + this.userid).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
    } else {
        this.userdata = res.data;

        const url = "http://localhost:3000/jobs/viewJob"


        this.http.get<any>(url + "/" + element.jobNo).subscribe(res => {
          if (res.state == false) {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Error", true ? "Retry" : undefined, config);
          } else {
                this.job = res.data
                //console.log(this.job)*/
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                  customer: this.userdata,
                  jobDetails: this.job

              };
              //console.log(dialogConfig.data)
              this.dialog.open(ViewJobComponent, dialogConfig);

          }//
        });
    }
  });

  }


}

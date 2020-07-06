import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { ViewJobComponent } from './view-job/view-job.component';

@Component({
  selector: 'app-ongoing-jobs',
  templateUrl: './ongoing-jobs.component.html',
  styleUrls: ['./ongoing-jobs.component.scss']
})
export class OngoingJobsComponent implements OnInit {

  cookie;
  currJobs;   //ongoing jobs

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
        console.log(this.currJobs);

      }
    });
  }

  viewCard(element) {
    // const dialogConfig = new MatDialogConfig();
    //   dialogConfig.data = {
    //     message: element.content,
    //     subject:element.subject,
    //     email:element.email
    // };

    this.dialog.open(ViewJobComponent, element);
  }


}

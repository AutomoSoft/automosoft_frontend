import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MycookiesService } from '../../../Admin/mycookies.service';
import {MatRadioModule} from '@angular/material/radio';
import { ConfirmationDialogComponent } from "../../../Auth/confirmation-dialog/confirmation-dialog.component";
import { ViewJobComponent } from '../view-job/view-job.component';

@Component({
  selector: 'app-select-job-status',
  templateUrl: './select-job-status.component.html',
  styleUrls: ['./select-job-status.component.scss']
})
export class SelectJobStatusComponent implements OnInit {

  cookie;
  jobNo: any;
  jobStatus: any;
  custId: any;
  selectedStatus: string;
  status: string[] = ['Queued', 'Started', 'Halfway', 'Completed','Collected'];

  constructor(
    public dialogRef: MatDialogRef<SelectJobStatusComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,

    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
  ) {
    this.jobNo = data.jobNo;
    this.jobStatus = data.jobStatus;
    this.custId = data.custId;

    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
    }
  }

  update(status) {
   // console.log(status)
    //console.log(this.custId)
    this.selectedStatus = status

    let date=Date();

    const formData ={
      lastmodifiedby: this.cookie.userid,
      lastmodifiedon:date,
      jobStatus:this.selectedStatus,
    };
    const url = 'http://localhost:3000/jobs/updateStatus/';


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to update?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        this.http.post<any>(url + this.jobNo, formData).subscribe(res => {
          if (res.state) {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Status Successfully Updated..! ", true ? "Done" : undefined, config);

          }
          else {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Error in Update Status..! ", true ? "Retry" : undefined, config);
          }
        });
        window.location.reload();
      }
    })

    // this.ngOnInit();
    this.dialogRef.close(status);
  }

  cancel() {
    this.dialogRef.close();
  }

}

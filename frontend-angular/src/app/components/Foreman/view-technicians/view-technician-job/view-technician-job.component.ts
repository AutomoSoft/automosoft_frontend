import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { ViewJobComponent } from '../../ongoing-jobs/view-job/view-job.component';
import { SelectJobStatusComponent } from '../../ongoing-jobs/select-job-status/select-job-status.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MycookiesService } from 'src/app/components/Admin/mycookies.service';
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
  selector: 'app-view-technician-job',
  templateUrl: './view-technician-job.component.html',
  styleUrls: ['./view-technician-job.component.scss']
})


export class ViewTechnicianJobComponent implements OnInit {
  customer: any;
  jobs: any;
  technician;
  items;
  firstname;
  lastname;
  capacity;
  userid;
  jobNo;
  cookie;
  techExpertise: [];
  flag2;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ViewJobComponent>,

    private dialog: MatDialog,
  ) {
    this.technician = data.technician;
    //this.firstname = data.firstname;
    this.capacity = data.capacity;
    this.lastname = data.lastname;
    this.jobs = data.jobDetails;
    this.jobNo = data.jobNo;
    console.log(this.jobs);

    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
    //console.log(this.technicians )
  }


  ngOnInit() {

  }
  selectStatus(status) {
    //console.log(status);
   this.dialogRef.close(status);
   const dialogConfig = new MatDialogConfig();
   dialogConfig.data = {

     jobNo: status.jobNo,
     jobStatus:status.jobStatus,
     custId: status.custId,
 };

     this.dialog.open(SelectJobStatusComponent, dialogConfig);
 }

 // ******************************************** Technicians for Jobs ********************************************************

//search tecnicians from relavant category
selectTechnician(category){

  //console.log(category)
  const url = "http://localhost:3000/technician/getTechnicians";

  this.http.get<any>(url + "/" + category).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! Please Check Job Category", true ? "Retry" : undefined, config);
    } else {
       this.flag2 = true;
      //console.log(res.data);
      this.techExpertise = res.data;


    }
  });
}

}

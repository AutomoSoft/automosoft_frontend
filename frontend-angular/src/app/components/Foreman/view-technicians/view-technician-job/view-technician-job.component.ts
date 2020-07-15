import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ViewJobComponent } from '../../ongoing-jobs/view-job/view-job.component';
import { SelectJobStatusComponent } from '../../ongoing-jobs/select-job-status/select-job-status.component';
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
  job: any;
  technician;
  items;
  firstname;
  lastname;
  capacity;
  userid;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ViewJobComponent>,

    private dialog: MatDialog,
  ) {
    this.technician = data.technician;
    this.firstname = data.firstname;
    this.capacity = data.capacity;
    this.lastname = data.lastname;
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

}

import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MycookiesService } from '../../../Admin/mycookies.service';
import { SelectJobStatusComponent } from '../select-job-status/select-job-status.component';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {

  customer: any;
  job: any;
  technicians;
  items;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ViewJobComponent>,

    private dialog: MatDialog,
  ) {
    this.customer = data.customer;
    this.job = data.jobDetails;
    this.technicians = data.jobDetails.technicians;
    this.items = data.jobDetails.itemsUsed;
    //console.log(this.technicians )
  }

  ngOnInit() {
  }

  selectStatus(status) {
    const dialogRef = this.dialog.open(SelectJobStatusComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }

}

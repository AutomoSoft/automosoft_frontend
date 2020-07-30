import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ViewHistoryComponent } from '../view-history.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  details;
  vehicles;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ViewHistoryComponent>,
  ) {

    this.details = data.jobDetails;
    this.vehicles = data.vehicles;
    console.log(this.vehicles.vehicleRegNo )

  }

  ngOnInit() {
  }

}

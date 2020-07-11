import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-select-job-status',
  templateUrl: './select-job-status.component.html',
  styleUrls: ['./select-job-status.component.scss']
})
export class SelectJobStatusComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectJobStatusComponent>,
  ) { }

  ngOnInit() {
  }

  jobStatusSelected(status) {
    this.dialogRef.close(status);
  }

  cancel() {
    this.dialogRef.close();
  }

}

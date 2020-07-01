import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  [x: string]: any;

  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

}

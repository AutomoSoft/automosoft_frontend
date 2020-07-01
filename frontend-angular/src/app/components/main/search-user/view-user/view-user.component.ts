import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";


import { EditUserComponent } from '../edit-user/edit-user.component';
import { ConfirmationDialogComponent } from "../../../Auth/confirmation-dialog/confirmation-dialog.component";

import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";


interface user {
  _id: String;
  usertype: String;
  userid: String;
  firstname: String;
  lastname: String;
  gender: String;
  nicnumber: String;
  address: String;
  contactnumber: String;
  email: String;
  password: String;
  addedon: String;
  lastmodifiedon: String;
  lastmodifiedby: String;
  vehicles: [];

  // filepath: String;
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  cookie;

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }

  ngOnInit() {


  }

  onEditUser() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '640px'
    });
  }
}

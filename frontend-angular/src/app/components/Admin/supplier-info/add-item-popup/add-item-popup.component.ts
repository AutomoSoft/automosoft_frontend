import { Component, OnInit, Inject } from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../mycookies.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../Auth/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-item-popup',
  templateUrl: './add-item-popup.component.html',
  styleUrls: ['./add-item-popup.component.scss']
})
export class AddItemPopupComponent implements OnInit {

  [x: string]: any;
  //email: String;

  replyForm: FormGroup;
  userid;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddItemPopupComponent>,

    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    //this.email = data.email;
    //console.log(this.email)
  }

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
  }

  this.replyForm = this.fb.group({
    usertype: [""],
    userid: [""],
    itemtype: ["", Validators.required],
    itemid: ["", Validators.required],
    brand: ["",Validators.required]
  });
  }
  onConfirmClick(): void {
    this.dialogRef.close(false);

  }

}










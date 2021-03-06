import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { element } from 'protractor';
import { MycookiesService } from '../../Admin/mycookies.service';
import { ReplyEmailComponent } from '../../Admin/reply-email/reply-email.component';



@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.scss']
})

export class EmailPopupComponent implements OnInit {
  message: String;
  subject: String;
  email: String;
  //dialogRef: any;
  constructor(
  @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<EmailPopupComponent>,
  private http: HttpClient,
  private cookies: MycookiesService,
  private router: Router,
  private fb: FormBuilder,
  public snackBar: MatSnackBar,
  private dialog: MatDialog,
  ) {
    //this.dialogRef.close(false);
    //dialogRef.disableClose = true;
    this.message = data.message;
    this.subject = data.subject;
    this.email = data.email;
  }



  ngOnInit(){

  }
  onConfirmClick(): void {
    this.dialogRef.close(false);
  }

  onReply() {
    // const dialogRef = this.dialog.open(ReplyEmailComponent, {
    //   width: '500px',
    //   data: {
    //     dataKey: this.email
    //   }
    // });
    //console.log(dialogRef);

    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        email:this.email
    };

        this.dialog.open(ReplyEmailComponent, dialogConfig);
  }

}



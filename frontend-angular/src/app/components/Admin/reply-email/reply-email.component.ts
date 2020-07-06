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
import { MycookiesService } from '../mycookies.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-reply-email',
  templateUrl: './reply-email.component.html',
  styleUrls: ['./reply-email.component.scss']
})
export class ReplyEmailComponent implements OnInit {
  [x: string]: any;
  email: String;

  replyForm: FormGroup;
  userid;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ReplyEmailComponent>,

    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.email = data.email;
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
    subject: ["", Validators.required],
    content: ["", Validators.required],
    email: ["",Validators.required]
  });

}


//send the reply email

sendReply() {

  const sendEmail = {
    subject: this.replyForm.value.subject,
    content: this.replyForm.value.content,
    email: this.replyForm.value.email,

  };

var url = "http://localhost:3000/reply/reply";

if (this.replyForm.invalid) {
  let config = new MatSnackBarConfig();
  this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
  return;
}else {
const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  data: {
    message: "Are you sure want to send?",
    buttonText: {
      ok: "Yes",
      cancel: "No"
    }
  }
});

dialogRef.afterClosed().subscribe((confirmed: boolean) => {

  if (confirmed) {
    this.http.post<any>(url, sendEmail).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        window.location.reload();
        // this.customerForm.reset();
      } else {
        console.log(res.msg);
        alert("Error!! Try Again");
        //this.router.navigate([this.cookie.userid,'registerSupplier']);
      }
    });
    console.log(sendEmail);
  }
});
}
}

onConfirmClick(): void {
  this.dialogRef.close(false);
  window.location.reload();
}

}

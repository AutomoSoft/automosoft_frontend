import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
import { contactData } from '../../main/contact/contact-data.model';
import { contactService } from '../../main/contact/contact.service';
import { HttpClient } from '@angular/common/http';
//import { MycookiesService } from '../mycookies.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';
import { element } from 'protractor';
import { MycookiesService } from '../../Admin/mycookies.service';



@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.scss']
})

export class EmailPopupComponent implements OnInit {
  message: String;
  subject: String;
  //dialogRef: any;
  constructor(
  private messageService: contactService,
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
  }

  getEmailsFromServer(){
    this.messageService.getMessages();
  }

  ngOnInit(){

  }
  onConfirmClick(): void {
    this.dialogRef.close(false);
  }
  viewSupplier(id) {
    console.log(id);
    /*const url = "http://localhost:3000/supplier/searchSuppliers"   //backend url

    this.http.get<any>(url + "/" + id).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        if(res.data.usertype=="Supplier"){
         // this.userflag = true;
        }
        this.dataform = true; //data form div show
        this.supplierdata = res.data;   //add response data in to datadata array
        this.supItems =res.data.items;
        // console.log(this.supplierdata);

      }
    });*/

  }


}



import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.scss']
})

export class MakeReservationsComponent implements OnInit {
  images;
  filename;
  cookie;
  pickedTime;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  onChangeHour(event) {
    console.log('event', event);
    this.pickedTime =event.hour.concat(":",event.minute);
    //console.log(this.pickedTime);
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }

  }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
      
  }

  //item registration form for items model
  reservationForm = this.fb.group({
    daterequested: ["", Validators.required],
    repairtype: ["", Validators.required],
    problembrief: ["", Validators.required],
  });

  addReservation() {
    console.log(this.reservationForm.value.repairtype);

    if (this.reservationForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }else {
      // let date=Date();
      const formData = new FormData();
          //append the data to the form
          formData.append("custID",  this.cookie.userid);
          formData.append("daterequested", this.reservationForm.value.daterequested);
          formData.append("time", this.pickedTime);
          formData.append("repairtype", this.reservationForm.value.repairtype);
          formData.append("problembrief", this.reservationForm.value.problembrief);
          formData.append("status", "pending");
          // formData.append('addedon', date)

          console.log(this.reservationForm.value.daterequested); // Successfully appends to formData
          console.log("formdata from frontend");
          console.log(JSON.stringify(formData));
          formData.forEach((value,key) => {
      console.log(key+" "+value)
    });
      var url = "http://localhost:3000/reservations/makeReservation";
  
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            message: "Confirm your reservation request",
            buttonText: {
              ok: "Confirm",
              cancel: "Cancel"
            }
          },
        });
  
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  
          if (confirmed) {
            this.http.post<any>(url, formData).subscribe(res => {
              if (res.state) {
                console.log(res.msg);
                window.location.reload();
  
              } else {
                console.log(res.msg);
                alert("Error!! Try Again");
               // this.router.navigate([this.cookie.userid,'AddItems']);
              }
            });
            console.log(formData);
          }
        });
  
      
  
  
    }
  
  
  
  }
} 

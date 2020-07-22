import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MycookiesService } from 'src/app/components/Admin/mycookies.service';

interface reservation{
  _id: String;
  custID: String;
  dateposted: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
  status: String;
}

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

export interface PeriodicElement {
  _id: String;
  custID: String;
  dateposted: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
}

@Component({
  selector: 'app-approve-reservations-popup',
  templateUrl: './approve-reservations-popup.component.html',
  styleUrls: ['./approve-reservations-popup.component.scss']
})
export class ApproveReservationsPopupComponent implements OnInit {
  cookie;
  reservationID;
  customer;
  reservation_data: reservation[] = [];
  reservationDataForm: FormGroup;

  constructor(private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
    //private dialogRef: MatDialogRef<ViewJobComponent>,

    private dialog: MatDialog,) { 
      if (this.cookies.getCookie("userAuth") != "") {
        this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
      }
      this.reservationID =data.reservationID;
      console.log(this.reservationID);
      this.customer=data.customerData;
    }

  ngOnInit() {
    const url = "http://localhost:3000/reservations/findReservation"   //backend url

    this.http.get<any>(url + "/" + this.reservationID).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
          console.log(res.data);
          this.reservation_data=res.data;
          console.log(this.reservation_data);
      }
    });


    this.reservationDataForm = this.fb.group({
      customerid: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      contact: ["", Validators.required],
      email: ["", Validators.required],
      probdef: ["", Validators.required],
      postedon: ["", Validators.required],
      //vehicles: this.fb.array([this.custVehicles]),
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

}

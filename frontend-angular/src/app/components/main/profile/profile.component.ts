import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";

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
  vehicles: String;

  // filepath: String;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userdata: user[] = [];
  userid;
  cookie;
  // veh;
  custVehicles;
  userflag: Boolean = false;  //to show/hide customer vehicle fields

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if (cookie == "") {
      this.router.navigate(['/login']);
    } else {
      this.userid = this.cookie.userid;

      const url = "http://localhost:3000/users/searchUsers"   //backend url

      this.http.get<any>(url + "/" + this.userid).subscribe(res => {
        if (res.state == false) {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
        } else {
          if (res.data.usertype == "Customer") {
            this.userflag = true;
          }
          else {
            this.userflag = false;
          }
          this.userdata = res.data;   //add response data in to data array
          // this.veh = JSON.parse(res.data.vehicles);
          this.custVehicles = res.data.vehicles
          //console.log(this.userdata);
          //console.log(this.veh[1]);

        }
      });
    }
  }

}

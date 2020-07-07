import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';


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

}
@Component({
  selector: 'app-userlanding',
  templateUrl: './userlanding.component.html',
  styleUrls: ['./userlanding.component.scss']
})
export class UserlandingComponent implements OnInit {

  userdata: user[] = [];
  cookie;
  userid;

  constructor(
    private router: Router,
    private cookies: MycookiesService,
    private http: HttpClient,
    public snackBar: MatSnackBar,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
   }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }else {
      this.userid=this.cookie.userid;

      const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        this.userdata = res.data;

      }
    });
    }
  }

}

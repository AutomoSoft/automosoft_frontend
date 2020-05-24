import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


interface user {
  _id: String;
  usertype: String;
  userid: String;
  firstname: String;
  lastname: String;
  gender: String;
  nic: String;
  address: String;
  contactnumber: String;
  email: String;
  password: String;

  // filepath: String;
}

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  userdata: user[] = [];
  userSearchForm: FormGroup;
  userid;
  dataform: Boolean = false;

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }

    this.userSearchForm = this.fb.group({
      userid: ['', Validators.required]
    });
  }

  searchUser() {
    this.userid = this.userSearchForm.value.userid; //get user id

    const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error find in user..! ", true ? "Retry" : undefined, config);
      } else {
        this.dataform = true; //data form div show
        this.userdata = res.data;   //add response data in to datadata array
        console.log(this.userdata);

      }
    });
  }

}

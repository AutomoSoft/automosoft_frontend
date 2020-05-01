import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loader=false;
  userid: String="";
  password: String="";
  user_id: any;
  user: any;
  authtoken: any;
  mySubscription: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    public snackBar: MatSnackBar,

  ) { }
  ngOnInit() { }

  userLogin() {
    // get user login details
    const user = {
      userid: this.userid,
      password: this.password
    };

    //login backend url
    var url = "http://localhost:3000/users/login";

    if(user.userid == ''){  //check users userid null or not
      let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("User ID is empty..! ", true ? "Retry" : undefined, config);
          return "userid empty";
    }
    else if(user.password == ''){ //check users password null or not
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Password is Empty..! ", true ? "Retry" : undefined, config);
      return "password empty";
    }
    else{
      console.log(user)
      this.http.post<any>(url, user).subscribe(res => { //requested to data to the server to login

        if (res.state == true) {
          
          this.router.navigate(['/landing'])
        }
        else {
          //user login state false shows error message
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Username or Password Incorrect..! ", true ? "Retry" : undefined, config);
          this.router.navigate(['/login']);
          //this.cookies.spiner=false;
          return "userid or password wrong";
        }
      });
    }
    return " ";
  }
}

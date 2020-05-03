import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MycookiesService } from '../../Admin/mycookies.service';

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
    private cookies: MycookiesService,

  ) { }
  ngOnInit() {
    if(this.cookies.logingstatus===true){
      var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      this.router.navigate([myCookie.userid,'landing']);
    }
  }

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
      //console.log(user)
      this.http.post<any>(url, user).subscribe(res => { //requested to data to the server to login

        if (res.state == true) {
          this.cookies.setCookie("userAuth", JSON.stringify(res.user), 1);  //set cookeis, user data
          var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));  //userdata convert to  JSON array
          var id = myCookie.usertype;                                     //get user type from the cookies
          console.log(myCookie);
          //this.router.navigate(['/landing']);
          if(id=="Administrator"){
            // this.router.navigate([myCookie.userid,'admin_dashboard']);
            // let config = new MatSnackBarConfig();
            // config.duration = true ? 2000 : 0;
            // this.snackBar.open("Successfully Logged In..! ", true ? "Done" : undefined, config);
            // return "Log as admin";
          }else if(id=="normaluser"){   //if other user logd in redirecto the menu
            this.router.navigate([myCookie.userid,'landing']);
            return "Log as normal user";
          }else{    //else redirected to the login form again
            this.router.navigate(['/login']);
            return "You are not a user"
          }
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

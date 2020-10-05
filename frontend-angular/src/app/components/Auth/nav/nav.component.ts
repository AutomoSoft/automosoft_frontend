import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  usertype
  cookie

  constructor(
    private router: Router,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  logoutUser() {

    this.cookies.setCookie("userAuth", "", -1);
    let config = new MatSnackBarConfig();
    config.duration = true ? 2000 : 0;
    this.snackBar.open("Logout Successfully..! ", true ? "Done" : undefined, config);
    this.cookies.logingstatus = false;
    this.router.navigate(['/login']);

  }

  dashboard() {
    var id = this.cookies.userData.userid;
    this.router.navigate([id, 'admin_dashboard']);

  }

  menu() {
    var id = this.cookies.userData.userid;
    this.router.navigate([id, 'landing']);
  }

}

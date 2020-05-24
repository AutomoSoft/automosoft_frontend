import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private cookies: MycookiesService,

  ) { }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
  }

}

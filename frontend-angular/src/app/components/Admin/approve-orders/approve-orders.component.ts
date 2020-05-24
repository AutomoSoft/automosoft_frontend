import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";

@Component({
  selector: 'app-approve-orders',
  templateUrl: './approve-orders.component.html',
  styleUrls: ['./approve-orders.component.scss']
})
export class ApproveOrdersComponent implements OnInit {

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

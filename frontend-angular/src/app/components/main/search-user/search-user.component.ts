import { Component, OnInit } from '@angular/core';
import { MycookiesService } from "../../Admin/mycookies.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(
    private cookies: MycookiesService,
    private router: Router,
  ) { }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
  }

}

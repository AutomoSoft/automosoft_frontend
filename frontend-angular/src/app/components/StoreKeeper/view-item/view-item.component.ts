import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

  userid;
  cookie;
  userdata;
  items = [];
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
  }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
  if(temp==""){
    this.router.navigate(['/login']);
  }
  this.ViewItems();
  }

  ViewItems() {
    const url = "http://localhost:3000/items/searchAllItems";

    this.http.get<any>(url).subscribe(res => {
      if (res.state === false) {
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Error Try Again !!! ', 'Retry', config);
      } else {
        this.items = res.data;
      }
    });
  }


 

}

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
  item = [];
  
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
  }

  ViewItems(element) {

    this.userid = element.itemid;
   // console.log(element.jobNo)
  
    const url = "http://localhost:3000/users/searchUsers"   //backend url
  
    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
          this.userdata = res.data;
  
          const url = "http://localhost:3000/items/searchAllItems"
  
  
          this.http.get<any>(url + "/" + element.itemid).subscribe(res => {
            if (res.state == false) {
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Error", true ? "Retry" : undefined, config);
            } else {
                  this.item = res.data
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    customer: this.userdata,
                    jobDetails: this.item
  
                };
                //console.log(dialogConfig.data)
               // this.dialog.open(ViewJobComponent, dialogConfig);
  
            }
          });
      }
    });
  
    }

}

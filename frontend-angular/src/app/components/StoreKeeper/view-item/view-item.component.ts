import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ItemDetailsComponent } from './item-details/item-details.component'

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

  itemid;
  cookie;
  userdata;
  items = [];
  item;
  
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
  ItemDetails (element) {

    this.itemid = element.itemid;
    //console.log(element.jobNo)
  
    const url = "http://localhost:3000/items/searchItembyId";  //backend url
  
    this.http.get<any>(url + "/" + this.itemid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No Item Found..! ", true ? "Retry" : undefined, config);
      } else {
                  this.item = res.data
                  //console.log(this.job)
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                
                    itemDetails: this.item,
  
                };
                //console.log(dialogConfig.data)
                this.dialog.open(ItemDetailsComponent, dialogConfig);
  
            }
          });
      }

}


 



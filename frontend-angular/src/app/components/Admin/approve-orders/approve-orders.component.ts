import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-approve-orders',
  templateUrl: './approve-orders.component.html',
  styleUrls: ['./approve-orders.component.scss']
})
export class ApproveOrdersComponent implements OnInit {

  pendingOrders; 
  cookie;
  order:any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  )  {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
  }

  ngOnInit() {
    var temp = this.cookies.getCookie("userAuth");
    if(temp==""){
      this.router.navigate(['/login']);
    }
      // *************************************************** Get Pending Orders ********************************************************

      const url = "http://localhost:3000/purchaseOrders/getPendingOrders";


      this.http.get<any>(url).subscribe(res => {
        if (res.state == false) {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
        } else {
  
          this.pendingOrders = res.data;
          //console.log(this.pendingOrders);
  
        }
      });
  }

  approveOrder(order){

    const data =  {
                  id: order._id
                };

    const url = "http://localhost:3000/purchaseOrders/approveOrder";

    this.http.put<any>(url,data).subscribe(res => {
      if (res.state) {
        let config = new MatSnackBarConfig();
        const snackBarRef = this.snackBar.open(res.msg, true ? "OK" : undefined, config);
        snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload();
        });

      } else {
        console.log(res.msg);
        alert("Error!! Try Again");

      }
    });

   
    }
  

  

}

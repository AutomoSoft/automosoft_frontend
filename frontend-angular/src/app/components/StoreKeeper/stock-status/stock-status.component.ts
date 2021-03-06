import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../Admin/mycookies.service";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ItemDetailsComponent} from "./item-details/item-details.component";
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";
import { StockReportComponent } from '../stock-report/stock-report.component';
import { RequestPurchaseOrderComponent } from './request-purchase-order/request-purchase-order.component';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import {
  PURCHASE_ORDERS
} from '../../../constants/index';

interface item {
  _id: String;
  itemtype: String;
  itemid: String;
  buying: String;
  selling: String;
  addedby: String;
  addedon: String;
  storequantity:Number;
  lastmodifiedby: String;
  lastmodifiedon: String;
  filepath: String;
}

//table data
export interface PeriodicElement {
  itemid: String;
  itemtype: String;
  itemname: String;
  buying: String;
  selling: String;
  addedby: String;
  addedon: String;
  storequantity: Number;
  lastmodifiedby: String;
  lastmodifiedon: String;
}

@Component({
  selector: 'app-stock-status',
  templateUrl: './stock-status.component.html',
  styleUrls: ['./stock-status.component.scss']
})
export class StockStatusComponent implements OnInit {

  displayedColumns: string[] = ['itemid', 'itemname', 'buying', 'selling', 'storequantity', 'action'];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;

  itemdata: item[] = [];
  itemSearchForm: FormGroup;
  itemDataForm: FormGroup;
  userid;
  itemid;
  cookie;
  dataform: Boolean = false;
  propicName;  //profile picture name
  itemtype;        // filter item
  searchText;
  custVehicles;
  userflag: Boolean = false;  //to show/hide customer vehicle fields
  userdata;
  items = [];
  item;
  approvedOrders;
  PURCHASE_ORDERS = PURCHASE_ORDERS;
  receivedOrders;
  itemSummary = []; //res is temporily stored
  chartLabels = [];
  chartData = [];

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
     this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }

    /**********************************************************************chart options***********************************************************************************/
    barChartOptions: ChartOptions = {
      responsive: true,
    };

    barChartLabels: Label[] = [];
    barChartType: ChartType = 'line';
    barChartLegend = true;
    barChartPlugins = [];

    barChartData: ChartDataSets[] = [
      { data: [0, 0], label: 'ITEM USAGE (MONTHLY RATE OF USE): ' },
    ];
    chartColors: Array<any> = [
      { // first color
        backgroundColor: 'rgba(78, 253, 119, 1)',
        borderColor: 'rgba(78, 253, 119, 1)',
        pointBackgroundColor: 'rgba(0, 65, 100,0.5)',
        pointBorderColor: 'rgba(2, 50, 50)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)',
        fill: true,     //chart Fill
      }
    ];

  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if (cookie == "") {
      this.router.navigate(['/login']);

    }

    this.itemSearchForm = this.fb.group({
      itemid: ['', Validators.required]
    });

    this.itemDataForm = this.fb.group({
      itemtype: ["", Validators.required],
      itemid: ["", Validators.required],
      itemname: ["", Validators.required],
      buying: ["", Validators.required],
      selling: ["", Validators.required],
      addedby: ["", Validators.required],
      addedon: ["", Validators.required],
      storequantity:["", Validators.required],
      lastmodifiedon: ["", Validators.required],
      lastmodifiedby: ["", Validators.required],
      //vehicles: this.fb.array([this.custVehicles]),
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });



    /*************************************************** Table Data(All Items) ***********************************************************/

    const url = "http://localhost:3000/items/searchAllItems"   //backend url

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error...! ", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA = res.data;   //add response data in to data array
        //this.propicName = res.data.filepath;
        console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
      }
    });

    this.fetchApprovedOrders();
    this.fetchReceivedOrders();
  }

  fetchReceivedOrders() {
    const url = `http://localhost:3000/purchaseOrders/fetchOrdersByStatus?status=${PURCHASE_ORDERS.ORDER_STATUS.RECEIVED}`;

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {
        this.receivedOrders = res.data;
      }
    });
  }

  /*************************************************** Search Item  ***********************************************************/

  searchItem() {
    this.itemid = this.itemSearchForm.value.itemid; //get supplier id

    for (var i = 0; i < 2; i++) {
      this.barChartData[0].data[i] = 0
    }

    const url = "http://localhost:3000/items/searchItembyId"   //backend url
    const url1 = "http://localhost:3000/items/itemChartData"

    this.http.get<any>(url + "/" + this.itemid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Item Not Found..! ", true ? "Retry" : undefined, config);
      } else {
        this.dataform = true; //data form div show
        this.itemdata = res.data;   //add response data in to datadata array
        console.log(this.itemdata)

        this.http.get<any>(url1 + "/" + this.itemid).subscribe(res => {
          if (res.state == false) {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Item Not Found..! ", true ? "Retry" : undefined, config);
          } else {
            this.itemSummary = res;

            // console.log(this.itemSummary)
            for (var i = 0; i < 2; i++) {
              this.chartData.push(this.itemSummary[i].Rate);
              // console.log( res[i].Rate)
              // console.log( res[i].month)

              this.chartLabels.push(this.itemSummary[i].month);

            }
            // console.log(this.chartData)
            // console.log(this.chartLabels)
            for ( var j=1; j>=0;j--){
              this.barChartData[0].data[j] = this.chartData[j]
            }
            this.barChartLabels = this.chartLabels.reverse();
            this.barChartData[0].data = this.barChartData[0].data.reverse();
            console.log(this.barChartData[0].data)
          }
        });
      }
    });
  }

  resetSearch() {
    this.itemSearchForm.reset();
  }

  back() {
    this.dataform = false; //data form div hide
    this.itemSearchForm.reset(); // clear the input fields
  }

  onArrowClick() {
    this.dataform = false;
  }

  addToStock(order) {
    const data ={
      id: order._id,
      itemName:order.itemname,
      itemId: order.itemid,
      quantity: order.quantity,
    };

    const url = "http://localhost:3000/purchaseOrders/addToStock";

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure you want to add to stock ?",
        buttonText: {
          ok: "Yes",
          cancel: "No"
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.http.put<any>(url, data).subscribe(res => {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          if (res.state === false) {
            this.snackBar.open(res.msg, true ? "Retry" : undefined, config);
          } else {
            this.snackBar.open(res.msg, true ? "Ok" : undefined, config);
          }
          this.fetchReceivedOrders();

        });
      }
    });
  }


  // ******************************************** View Items Category Wise ********************************************************

//search items from relavant category
selectItem(category){

  console.log(category)
  if(category=="all"){
    const url = "http://localhost:3000/items/searchAllItems"   //view all items url

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error...! ", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA = res.data;   //add response data in to data array
        //this.propicName = res.data.filepath;
        console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
      }
    });

  }else{
    const url = "http://localhost:3000/items/categorizeItems";   //view categorized items url

    this.http.get<any>(url + "/" + category).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error !!! Please check the Item Category", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA = res.data;   //add response data in to data array
          //this.propicName = res.data.filepath;
          console.log(this.TABLE_DATA);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);

      }
    });
  }

}

 // ******************************************** Item Details Popup ********************************************************
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

  viewReport() {
    const dialogRef = this.dialog.open(StockReportComponent, {
      width: '640px',
      data: this.dataSource
    });
  }

  requestItem(element) {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
         item:element,
         user:this.cookie,
      };
    const dialogRef = this.dialog.open(RequestPurchaseOrderComponent,dialogConfig);
  }

 // ******************************************** View Approved Orders ********************************************************

fetchApprovedOrders() {
  const url = `http://localhost:3000/purchaseOrders/fetchOrdersByStatus?status=${PURCHASE_ORDERS.ORDER_STATUS.APPROVED}`;

  this.http.get<any>(url).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
    } else {

      this.approvedOrders = res.data;
      console.log(this.approvedOrders);

    }
  });
}

}

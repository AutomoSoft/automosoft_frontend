import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatTableDataSource } from '@angular/material';
import { HttpClient } from "@angular/common/http";


interface invoice {
  _id: String;
  itemsUsed:[];
  invoiceNo: String;
  invoiceDate: String;
  jobNo: String;
  jobDate: String;
  custId: String;
  firstName: String;
  lastName: String;
  vehicleNo: String;
  engineNo: String;
  subTotal: String;
  tax: String;
  grandTotal: String;
  amountPaid: String;
  balance: String;
  note: String;
  createdBy: String;
  filePath: String;
}

//table data
export interface PeriodicElement {
  invoiceNo: String;
  invoiceDate: String;
  jobNo: String;
  jobDate: String;
  custId: String;
  firstName: String;
  lastName: String;
  vehicleNo: String;
  engineNo: String;
  subTotal: String;
  tax: String;
  grandTotal: String;
  amountPaid: String;
  balance: String;
  note: String;
  createdBy: String;
}

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.scss']
})
export class InvoiceHistoryComponent implements OnInit {

  displayedColumns: string[] = ['invoiceNo', 'invoiceDate','jobNo', 'grandTotal', 'createdBy','vehicleNo'];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    const url = "http://localhost:3000/invoice/viewAllInvoices";

    this.http.get<any>(url).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error loading data!", true ? "Retry" : undefined, config);
    } else {
      //  this.flag2 = true;
      // //console.log(res.data);
      // this.techExpertise = res.data;

      this.TABLE_DATA = res.data;   //add response data in to data array
      //this.propicName = res.data.filepath;
      console.log(this.TABLE_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);

    }
  });
  }

}

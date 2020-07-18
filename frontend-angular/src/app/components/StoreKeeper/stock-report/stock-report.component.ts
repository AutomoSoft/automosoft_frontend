import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatSnackBarConfig, MatDialogRef } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {

  [x: string]: any;
  reportData: String;

  jsPDF: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StockReportComponent>,

    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.reportData = data.data;
    console.log(this.reportData)
   }

   htmlToPdf() {
    let pdfContent = window.document.getElementById("pdfContent");

    var data = document.getElementById('pdfContent');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
}


  ngOnInit() {
  }

}

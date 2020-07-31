import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";

//table data
export interface PeriodicElement {
  _id: String;
  custID: String;
  dateposted: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
  dateaccepted: String;
  status: String;
}

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.scss']
})

export class MakeReservationsComponent implements OnInit {
  images;
  filename;
  cookie;
  pickedTime;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  onChangeHour(event) {
    console.log('event', event);
    this.pickedTime =event.hour.concat(":",event.minute);
    //console.log(this.pickedTime);
  }

  displayedColumns_2: string[] = ['repairtype', 'daterequested','time','problembrief', 'action']; // Table Columns will displayed according to this order
  displayedColumns_1: string[] = ['repairtype', 'daterequested','time','problembrief', 'dateaccepted']; // Table Columns will displayed according to this order
  TABLE_DATA_1: PeriodicElement[] = [];
  TABLE_DATA_2: PeriodicElement[] = [];
  dataSource_1;
  dataSource_2;
  repairtype_1: String;
  repairtype_2: String;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
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


    // *************************************************** Get All Reservations Made By Customer OnInit********************************************************
    
    const url_1 = "http://localhost:3000/reservations/findReservationByCustomer";

    this.http.get<any>(url_1 + "/" + this.cookie.userid).subscribe(res_1 => {
      if (res_1.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config);
      } else {

        this.TABLE_DATA_1 = res_1.data;
        console.log(this.TABLE_DATA_1);
        this.dataSource_1 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_1);
      }
    });

  }

  //item registration form for items model
  reservationForm = this.fb.group({
    daterequested: ["", Validators.required],
    time: ["", Validators.required],
    repairtype: ["", Validators.required],
    problembrief: ["", Validators.required],
    //time: ["", Validators.required]

  });

  addReservation() {
      let date=Date();
      let inputDate = this.reservationForm.value.daterequested.toString();
      let reqDate = inputDate.slice(0,15);
      const reserveTime = {
        usertype : "Customer",
        custID: this.cookie.userid,
        dateposted:date.slice(0,24),
        daterequested: reqDate,
        repairtype: this.reservationForm.value.repairtype,
        time: this.reservationForm.value.time,
        problembrief:this.reservationForm.value.problembrief,
        status:"pending"
      };

    var url = "http://localhost:3000/reservations/makeReservation";

    if (this.reservationForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }else {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure want to Add?",
        buttonText: {
          ok: "Yes",
          cancel: "No"
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.http.post<any>(url, reserveTime).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            window.location.reload();
            // this.customerForm.reset();
          } else {
            console.log(res.msg);
            alert("Error!! Try Again");
            this.router.navigate([this.cookie.userid,'registerSupplier']);
          }
        });
        console.log(reserveTime);
      }
    });
    }
  }


//******************************************** View Customer's Reservations Job Category Wise ********************************************************

    selectJob_1(category){

      console.log(category)
  
      const url = "http://localhost:3000/reservations/getReservationsByCategoryOfCust";
      
      var searchdata = {cat: category, 
                        uid: this.cookie.userid}; // ERR 404
  
      this.http.get<any>(url + searchdata).subscribe(res => {
        if (res.state == false) {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Error !!! Please check the Item Category", true ? "Retry" : undefined, config);
        } else {
          this.TABLE_DATA_1 = res.data;   //add response data in to data array
            console.log(this.TABLE_DATA_1);
            this.dataSource_1 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_1);
  
        }
      });
      
  
    }


}

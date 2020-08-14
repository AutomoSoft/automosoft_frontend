import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig, MatSnackBarConfig, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MycookiesService } from 'src/app/components/Admin/mycookies.service';
import { ConfirmationDialogComponent } from 'src/app/components/Auth/confirmation-dialog/confirmation-dialog.component';

interface reservation{
  _id: String;
  custID: String;
  dateposted: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
  status: String;
}

interface user {
_id: String;
usertype: String;
userid: String;
firstname: String;
lastname: String;
gender: String;
nicnumber: String;
address: String;
contactnumber: String;
email: String;
password: String;
addedon: String;
lastmodifiedon: String;
lastmodifiedby: String;
vehicles: [];
// filepath: String;
}

//table data
export interface PeriodicElement_2 {
  userid: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  contactnumber: String;
  gender: String;
  nicnumber: String;
  address: String;
  expertise: String;
  capacity: String;
}

export interface PeriodicElement {
  _id: String;
  custID: String;
  dateposted: String;
  daterequested:String;
  time: String;
  repairtype: String;
  problembrief: String;
}

@Component({
  selector: 'app-approve-reservations-popup',
  templateUrl: './approve-reservations-popup.component.html',
  styleUrls: ['./approve-reservations-popup.component.scss']
})
export class ApproveReservationsPopupComponent implements OnInit {
  cookie;
  category;
  reservationID;
  customer;
  customerArray = [];
  reservation_data: reservation[] = [];
  reservationDataForm: FormGroup;
  techExpertise: [];

  displayedColumns: string[] = ['repairtype','time','problembrief']; // Table Columns will displayed according to this order
  displayedColumns_2: string[] = ['userid', 'firstname','lastname', 'capacity', 'currentjobCap']; // Table Columns will displayed according to this order Technicians Availability
  TABLE_DATA: PeriodicElement[] = [];
  TABLE_DATA_2: PeriodicElement_2[] = [];
  dataSource;
  dataSource_2;
  reservation_date;

  constructor(private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ApproveReservationsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    //private dialogRef: MatDialogRef<ViewJobComponent>,

    private dialog: MatDialog,) {
      if (this.cookies.getCookie("userAuth") != "") {
        this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
      }
      this.reservationID =data.reservationID;
      console.log(this.reservationID);
      this.customer=data.customerData;

      // entering object's value to the array
      for (var x in this.customer){
        this.customer.hasOwnProperty(x) && this.customerArray.push(this.customer[x])
      }
      console.log("this.customerArray");
      console.log(this.customerArray[3]); // access customer data like this


      this.category= data.category;
      console.log(this.category);
    }

  ngOnInit() {
    const url = "http://localhost:3000/reservations/findReservation"   //backend url

    const reservArr = []; // to convert reservation_data object to an array


    this.http.get<any>(url + "/" + this.reservationID).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);

      } else {

          console.log(res.data);
          this.reservation_data=res.data;
          console.log(this.reservation_data);

          // entering object's value to the array
          for (var x in this.reservation_data){
            this.reservation_data.hasOwnProperty(x) && reservArr.push(this.reservation_data[x])
          }
          console.log(reservArr);


//******************************************** View Accepted Reservations For The Date ********************************************************

            const url_popup = "http://localhost:3000/reservations/viewAcceptedReservationsForTheDate";
            console.log(reservArr[3]);

              this.http.get<any>(url_popup +"/" + reservArr[3]).subscribe(res2 => {
                if (res2.state == false) {

                  let config2 = new MatSnackBarConfig();
                  config2.duration = true ? 2000 : 0;
                  this.snackBar.open("Error Try Again !!! ", true ? "Retry" : undefined, config2);

                } else {

                  this.TABLE_DATA = res2.data;
                  console.log(this.TABLE_DATA);
                  this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
                }
              });

      }
    });


    this.reservationDataForm = this.fb.group({
      customerid: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      contact: ["", Validators.required],
      email: ["", Validators.required],
      probdef: ["", Validators.required],
      postedon: ["", Validators.required],
      //vehicles: this.fb.array([this.custVehicles]),
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });

    //******************************************** View Technicians Availability ********************************************************


    console.log(this.category);
  const url_2 = "http://localhost:3000/technician/getTechnicians";

  this.http.get<any>(url_2 + "/" + this.category).subscribe(res_2 => {
    if (res_2.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! Please Check Job Category", true ? "Retry" : undefined, config);
    } else {
      this.TABLE_DATA_2 = res_2.data;   //add response data in to data array
      //this.propicName = res.data.filepath;
      console.log(this.TABLE_DATA);
      this.dataSource_2 = new MatTableDataSource<PeriodicElement_2>(this.TABLE_DATA_2);
    }
  });


  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  /*************************************************************** Accept The Reservation  ******************************************************************/

  onAcceptClick() {


      let date=Date();

      const reqDetails ={
        foremanid: this.cookie.userid,
        dateaccepted:date.slice(0,24),
        custID: this.customerArray[2],
        contactnumber: this.customerArray[8]
      };


      console.log(reqDetails);
      console.log(this.customerArray)
      const url = 'http://localhost:3000/reservations/acceptReservation/';    //backend url


      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Confirm acceptance?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {

          this.http.post<any>(url + this.reservationID, reqDetails).subscribe(res => {
            if (res.state) {
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Successfully Updated..! ", true ? "Done" : undefined, config);
            }
            else {
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Error in Update User..! ", true ? "Retry" : undefined, config);
            }
          });
          window.location.reload();
        }
      })

  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MycookiesService } from '../../../Admin/mycookies.service';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

import { ConfirmationDialogComponent } from "../../../Auth/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.component.html',
  styleUrls: ['./add-new-vehicle.component.scss']
})
export class AddNewVehicleComponent implements OnInit {

  public customer: any;
  cookie;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddNewVehicleComponent>,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
    this.customer = data.customer;
    //console.log(this.customer);
  }

  get vehicles(): FormGroup {
    return this.fb.group({
      vehicleRegNo: ["", Validators.required],
      chasis: ["", Validators.required],
      EngineNo: ["", Validators.required],
    });
  }

  vehicleForm = this.fb.group({
    vehicles: this.fb.array([this.vehicles]),
  });

  addnewVehicle(){

  if (this.vehicleForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
    let date=Date();

        const formData = {
          vehicles: this.vehicleForm.value.vehicles,
          lastmodifiedby: this.cookie.userid,
          lastmodifiedon: date,
        };

  var url = "http://localhost:3000/users/addnewVehicle/";
  //console.log(formData)

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure want to Add?",
        buttonText: {
          ok: "Yes",
          cancel: "No"
        }
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.http.post<any>(url + this.customer, formData).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            window.location.reload();

          } else {
            console.log(res.msg);
            alert("Error!! Try Again");
            this.router.navigate(['addNewVehicle']);
          }
        });
        console.log(formData);
      }
    });



}
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

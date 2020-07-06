import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../../Admin/mycookies.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { ConfirmationDialogComponent } from "../../../Auth/confirmation-dialog/confirmation-dialog.component";
import { Router } from "@angular/router";

import { Inject } from '@angular/core';


import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  [x: string]: any;

  editForm: FormGroup;
  userid;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }



  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
    }

    this.editForm = this.fb.group({
      usertype: [""],
      userid: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      nicnumber: ["", Validators.required],
      address: ["", Validators.required],
      contactNo: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      email: ["", [Validators.email]],
      addedon: [""],
      lastmodifiedon: [""],
      lastmodifiedby: [""],
      vehicles: this.fb.array([this.custVehicles]),
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });
    console.log(this.data.dataKey.usertype)
  }

  /*************************************************** Update User  ***********************************************************/

  updateUser() {


    if (this.editForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }
    else {
      let date=Date();

      const formData ={
        usertype:this.data.dataKey.usertype,
        userid:this.data.dataKey.userid,
        firstName:this.editForm.value.firstName,
        lastName:this.editForm.value.lastName,
        gender:this.data.dataKey.gender,
        nicnumber:this.editForm.value.nicnumber,
        address:this.editForm.value.address,
        contactnumber:this.editForm.value.contactNo,
        email:this.editForm.value.email,
        vehicles:this.custVehicles,
        //password:this.UserDataForm.value.password,
        lastmodifiedby: this.cookie.userid,
        lastmodifiedon:date,
      };


      //console.log(formData);
      const url = 'http://localhost:3000/users/updateUser/';    //backend url


      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure want to update?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {

          this.http.post<any>(url + this.data.dataKey.userid, formData).subscribe(res => {
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

  onCancel() {
    this.dialogRef.close();
  }

}

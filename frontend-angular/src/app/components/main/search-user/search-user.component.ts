import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "../../Auth/confirmation-dialog/confirmation-dialog.component";


import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
  Form
} from "@angular/forms";


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
  vehiclenumber: String;

  // filepath: String;
}

//table data
export interface PeriodicElement {
  userid: String;
  usertype: String;
  firstname: String;
  email: String;
  contactnumber: String;
  filepath: String;
  action: String;
}

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  displayedColumns: string[] = ['userid', 'usertype','firstname', 'email', 'contactnumber','action'];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;

  userdata: user[] = [];
  userSearchForm: FormGroup;
  UserDataForm: FormGroup;
  userid;
  cookie;
  dataform: Boolean = false;
  propicName;  //profile picture name

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


  ngOnInit() {
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
    }

    this.userSearchForm = this.fb.group({
      userid: ['', Validators.required]
    });

    this.UserDataForm = this.fb.group({
      usertype: ["", Validators.required],
      userid: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      nicnumber: ["", Validators.required],
      address: ["", Validators.required],
      contactNo: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      addedon: ["", Validators.required],
      lastmodifiedon: ["", Validators.required],
      lastmodifiedby: ["", Validators.required],
      //vehiclenumber: ["", Validators.required],
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });


/*************************************************** Table Data  ***********************************************************/

    const url = "http://localhost:3000/users/searchAllUsers"   //backend url

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error...! ", true ? "Retry" : undefined, config);
      } else {
        this.TABLE_DATA = res.data;   //add response data in to datadata array
        //this.propicName = res.data.filepath;
        console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
      }
    });

  }

/*************************************************** Search User  ***********************************************************/

  searchUser() {
    this.userid = this.userSearchForm.value.userid; //get user id

    const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        if(res.data.usertype=="Customer"){
          //this.userflag = true;
        }
        this.dataform = true; //data form div show
        this.userdata = res.data;   //add response data in to datadata array
        this.propicName = res.data.filepath;
        //console.log(this.userdata);

      }
    });
  }

  resetSearch(){
    this.userSearchForm.reset();
  }

  cancel(){
    // this.UserDataForm.reset();
     window.location.reload();
  }


  //view user from table
  viewUser(id) {
    const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + id).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        if(res.data.usertype=="Customer"){
         // this.userflag = true;
        }
        this.dataform = true; //data form div show
        this.userdata = res.data;   //add response data in to datadata array
        this.propicName = res.data.filepath;
        //console.log(this.userdata);

      }
    });
  }


  /*************************************************** Update User  ***********************************************************/

  updateUser() {
    if (this.UserDataForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }
    else {
      let date=Date();
    //   const formData = new FormData();
    //   //append the data to the form
    //  // formData.append('profileImage', this.images)
    //   formData.append('usertype', this.UserDataForm.value.usertype)
    //   formData.append('userid', this.UserDataForm.value.userid)
    //   formData.append('firstName', this.UserDataForm.value.firstName)
    //   formData.append('lastName', this.UserDataForm.value.lastName)
    //   formData.append('gender', this.UserDataForm.value.gender)
    //   formData.append('nic', this.UserDataForm.value.nicnumber)
    //   formData.append('address', this.UserDataForm.value.address)
    //   formData.append('contactnumber', this.UserDataForm.value.contactNo)
    //   formData.append('email', this.UserDataForm.value.email)
    //   formData.append('password', this.UserDataForm.value.password)
    //   formData.append('lastmodifiedby',  this.cookie.userid)
    //   formData.append('lastmodifiedon', date)

    const formData ={
      usertype:this.UserDataForm.value.usertype,
      userid:this.UserDataForm.value.userid,
      firstName:this.UserDataForm.value.firstName,
      lastName:this.UserDataForm.value.lastName,
      gender:this.UserDataForm.value.gender,
      nicnumber:this.UserDataForm.value.nicnumber,
      address:this.UserDataForm.value.address,
      contactnumber:this.UserDataForm.value.contactNo,
      email:this.UserDataForm.value.email,
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

          this.http.post<any>(url + this.userid, formData).subscribe(res => {
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

  /*************************************************** Delete User  ***********************************************************/

  delete(){
    const url1 = "http://localhost:3000/users/delprofImage/" //delete profile image
    const url2 = "http://localhost:3000/users/deleteUser/"  //delete data from tha database

    //confirmaration box
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (this.propicName) {
          this.http.delete<any>(url1 + this.propicName).subscribe(res => {
            console.log(res);
          })
        }
        this.http.delete<any>(url2 + this.userid).subscribe(res => {
          if (res.state == true) {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Successfully Deleted..! ", true ? "Done" : undefined, config);
          }
          else {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Deletion Unsuccessfull..! ", true ? "Retry" : undefined, config);
          }
        })
        window.location.reload();
      }
    });
  }

  //delete from table
  deleteTable(id,propic){
    //console.log(id);
    const url1 = "http://localhost:3000/users/delprofImage/" //delete profile image
    const url2 = "http://localhost:3000/users/deleteUser/"  //delete data from tha database

    //confirmaration box
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (propic) {
          this.http.delete<any>(url1 + propic).subscribe(res => {
            console.log(res);
          })
        }
        this.http.delete<any>(url2 + id).subscribe(res => {
          if (res.state == true) {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Successfully Deleted..! ", true ? "Done" : undefined, config);
          }
          else {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Deletion Unsuccessfull..! ", true ? "Retry" : undefined, config);
          }
        })
        window.location.reload();
      }
    });
  }



}



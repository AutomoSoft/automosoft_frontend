import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../mycookies.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';

interface supplier {
  _id: String;
  usertype: String;
  supid: String;
  supname: String;
  address: String;
  contactnumber: String;
  email: String;
  items: String;
  note:String;
  addedon: String;
  addedby: String;


  // filepath: String;
}

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {
  displayedColumns: string[] = ['supid', 'supname', 'items', 'addedon','action'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;
  cookie;
  userSearchForm: FormGroup;
  SupplierDataForm: FormGroup;
  supid;
  dataform: Boolean = false;

  supplierdata: supplier[] = [];


  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }
  }



  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    var cookie = this.cookies.getCookie("userAuth");
    if(cookie==""){
      this.router.navigate(['/login']);
    }

    this.SupplierDataForm = this.fb.group({
      usertype: ["", Validators.required],
      supid: ["", Validators.required],
      supplierName: ["", Validators.required],
      address: ["", Validators.required],
      contactnumber: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      addedon: ["", Validators.required],
      items: ["", Validators.required],
      //vehiclenumber: ["", Validators.required],
      //password: ["", [Validators.required, Validators.minLength(8)]],
    });

    const url = "http://localhost:3000/supplier/searchSuppliers"   //backend url

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



  cancel(){
    // this.UserDataForm.reset();
     window.location.reload();
  }




  //view supplier from table
  viewUser(id) {
    const url = "http://localhost:3000/supplier/searchSuppliers"   //backend url

    this.http.get<any>(url + "/" + id).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        if(res.data.usertype=="Supplier"){
         // this.userflag = true;
        }
        this.dataform = true; //data form div show
        this.supplierdata = res.data;   //add response data in to datadata array
        console.log(this.supplierdata);

      }
    });
  }

  /*************************************************** Update Supplier  ***********************************************************/

  updateSupplier() {
    if (this.SupplierDataForm.invalid) {
      let config = new MatSnackBarConfig();
      this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
      return;
    }
    else {
      let date=Date();

    const formData ={
      usertype:this.SupplierDataForm.value.usertype,
      supid:this.SupplierDataForm.value.supid,
      supname:this.SupplierDataForm.value.supname,
      address:this.SupplierDataForm.value.address,
      contactnumber:this.SupplierDataForm.value.contactnumber,
      email:this.SupplierDataForm.value.email,
      items:this.SupplierDataForm.value.items,
      addedby:this.SupplierDataForm.value.addedby,
      addedon:this.SupplierDataForm.value.addedon,

    };


      //console.log(formData);
      const url = 'http://localhost:3000/supplier/updateSupplier';    //backend url


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

          this.http.post<any>(url + this.supid, formData).subscribe(res => {
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

  /*************************************************** Delete Supplier ***********************************************************/

  delete(){
    const url2 = "http://localhost:3000/supplier/deleteSupplier/"  //delete data from tha database

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

        this.http.delete<any>(url2 + this.supid).subscribe(res => {
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
  deleteTable(id){
    //console.log(id);
    //const url1 = "http://localhost:3000/users/delprofImage/" //delete profile image
    const url2 = "http://localhost:3000/supplier/deleteSupplier/"  //delete data from tha database

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
        /*if (propic) {
          this.http.delete<any>(url1 + propic).subscribe(res => {
            console.log(res);
          })
        }*/
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
export interface PeriodicElement {
  supid: string;
  supname: string;
  items: string;
  addedon: string;
  action: string;
}

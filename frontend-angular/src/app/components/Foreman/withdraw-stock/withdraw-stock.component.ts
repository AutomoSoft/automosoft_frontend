import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MycookiesService} from '../../Admin/mycookies.service';
import { MatDialog, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  Validators,
} from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-stock',
  templateUrl: './withdraw-stock.component.html',
  styleUrls: ['./withdraw-stock.component.scss']
})
export class WithdrawStockComponent implements OnInit {

  cookie;
  userid;
  items = [];

  constructor( private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,) { 
      
      
      if (this.cookies.getCookie("userid") != "") {
        this.userid = this.cookies.getCookie("userid");
        console.log(this.userid);
      }
    }
    

    withdrawalForm = this.fb.group({
      stockid: ["", Validators.required],
      foremanid: ["", Validators.required],
      technicianid: ["", Validators.required],
      jobNo: ["", Validators.required],
      customerid:["",Validators.required],
      vehicleNo:["",Validators.required],
      itemid: ["", Validators.required],
      qty: ["", Validators.required]
    });

    
save() {

  if (this.withdrawalForm.invalid) {
    let config = new MatSnackBarConfig();
    this.snackBar.open("Please Check Marked Form Errors", true ? "OK" : undefined, config);
    return;
  }else {
    let date=Date();
    const formData = new FormData();
        //append the data to the form
        formData.append('stockid', this.withdrawalForm.value.stockid)
        formData.append('foremanid', this.withdrawalForm.value.foremanid)
        formData.append('technicianid', this.withdrawalForm.value.technicianid)
        formData.append('jobNo', this.withdrawalForm.value.jobNo)
        formData.append('customerid', this.withdrawalForm.value.customerid)
        formData.append('vehicleNo', this.withdrawalForm.value.vehicleNo)
        formData.append('itemid', this.withdrawalForm.value.itemid)
        formData.append('qty', this.withdrawalForm.value.qty)
       
    var url = "http://localhost:3000/users/";

   
     /*dialogRef.afterClosed().subscribe((confirmed: boolean) => {

        if (confirmed) {
          this.http.post<any>(url, formData).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              window.location.reload();

            } else {
              console.log(res.msg);
              alert("Error!! Try Again");
              this.router.navigate([this.cookie.userid,'registerEmployee']);
            }
          });
          console.log(formData);
        }
      });*/

    }


  }
clear(){
  this.withdrawalForm.reset();
}

ngOnInit() {
  var temp = this.cookies.getCookie("userAuth");
  if(temp==""){
    this.router.navigate(['/login']);
  }
}

addItem() {
  const newItemId = this.withdrawalForm.value.itemid;
  const newQty = this.withdrawalForm.value.qty;
  let notFound = true;
  this.items = this.items.map((itemObject) => {
    const itemId = itemObject.itemId;
    const qty = itemObject.qty;
    if (itemId === newItemId) {
      notFound = false;
      itemObject.qty = parseInt(qty, 10) + parseInt(newQty, 10);
    }
    return itemObject;
  });
  if (notFound) {
    this.items.push({ itemId: newItemId, qty: newQty });
  }
}

removeItem() {
  const newItemId = this.withdrawalForm.value.itemid;
  const newQty = this.withdrawalForm.value.qty;
  let itemIndex = -1;
  let shouldRemove = false;
  this.items = this.items.map((itemObject, index) => {
    const itemId = itemObject.itemId;
    const qty = itemObject.qty;
    if (itemId === newItemId) {
      itemIndex = index;
      if (qty <= newQty) {
        shouldRemove = true;
      } else {
        itemObject.qty = parseInt(qty, 10) - parseInt(newQty, 10);
      }
    }
    return itemObject;
  });

  if (shouldRemove) {
    this.items.splice(itemIndex, 1);
  }
}

}

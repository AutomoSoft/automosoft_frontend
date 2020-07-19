import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MycookiesService } from "../../Admin/mycookies.service";
import { MatDialog, MatSnackBar, MatSnackBarConfig,MatTableDataSource, MatDialogConfig } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { ViewJobComponent } from '../ongoing-jobs/view-job/view-job.component';
import { EmailPopupComponent } from '../../Auth/email-popup/email-popup.component';
import { ViewTechnicianJobComponent } from './view-technician-job/view-technician-job.component';

interface technician {
  _id: String;
  vehicles:[];
  usertype: String;
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
  addedby: String;
  addedon: String;
  lastmodifiedby: String;
  lastmodifiedon: String;
  filepath: String;
  currentjobCap: String;
}

interface jobs {
  _id: String;
  jobNo: String;
  jobType: String;
  custId: String;
  jobStatus: String;
  technicians: String;
  itemsUsed: String;
}

//table data
export interface PeriodicElement {
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

@Component({
  selector: 'app-view-technicians',
  templateUrl: './view-technicians.component.html',
  styleUrls: ['./view-technicians.component.scss']
})
export class ViewTechniciansComponent implements OnInit {
  displayedColumns: string[] = ['userid', 'firstname','lastname', 'capacity', 'currentjobCap','action'];
  cookie;
  flag2 = false;  //show technicians section
  jobCat;        // filter technicians
  techExpertise: [];
  TABLE_DATA: PeriodicElement[] = [];
  dataSource;
  dataform: Boolean = false;
  currJobs;   //ongoing jobs
  userdata: technician[] = [];
  jobs: jobs[] = [];
  userid;

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
  }


// ******************************************** View Technicians Category Wise ********************************************************

//search tecnicians from relavant category
selectTechnician(category){

  console.log(category)
  const url = "http://localhost:3000/technician/getTechniciansCat";

  this.http.get<any>(url + "/" + category).subscribe(res => {
    if (res.state == false) {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Error !!! Please Check Job Category", true ? "Retry" : undefined, config);
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
/*viewCard(element) {



    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        firstname : element.firstname,
        lastname: element.lastname,
        capacity: element.capacity
    };

        this.dialog.open(ViewTechnicianJobComponent, dialogConfig);


  }*/
  viewCard(element) {

    this.userid = element.techId;
    //console.log(element.jobNo)

    const url = "http://localhost:3000/users/searchUsers"   //backend url

    this.http.get<any>(url + "/" + element.userid).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("No User Found..! ", true ? "Retry" : undefined, config);
      } else {
        this.userdata = res.data;
        const url = "http://localhost:3000/jobs/viewtechnicianJob"


        this.http.get<any>(url + "/" + element.userid).subscribe(res => {
          if (res.state == false) {
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Error", true ? "Retry" : undefined, config);
          } else {
                this.jobs = res.data
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    technician: this.userdata,
                    //firstname : element.firstname,
                    //lastname: element.lastname,
                    //capacity: element.capacity,
                    jobDetails: this.jobs,
                    jobNo: element.jobNo
                };

          this.dialog.open(ViewTechnicianJobComponent, dialogConfig);
      }
    });

    }
  });
}

}

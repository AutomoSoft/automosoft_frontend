import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { contactData } from '../../main/contact/contact-data.model';
import { contactService } from '../../main/contact/contact.service';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../mycookies.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog, MatSnackBarConfig, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';
import { element } from 'protractor';
import { EmailPopupComponent } from '../../Auth/email-popup/email-popup.component';
import { ReplyEmailComponent } from '../reply-email/reply-email.component';

export interface IPeriodicElement {
  _id: String;
  name: String;
  email: String;
  subject: String;
  content: String;
  isRead: Boolean;
  addedon: number;
  action: String;
  isArchived: Boolean;

}
class PeriodicElement implements IPeriodicElement {
  _id: String;
  name: String;
  email: String;
  subject: String;
  content: String;
  isRead: Boolean;
  addedon: number;
  action: String;
  isArchived: Boolean;

  public get rowColor() {
    if(this.isRead){
      return "#ffffff";
    }
    else {
      return "#000000";
    }

  }


}


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  color;
  userid;
  cookie;
  displayedColumns: string[] = ['name', 'email', 'subject','content','action','addedon'];
  TABLE_DATA: PeriodicElement[] = [];
  ORIGINAL_TABLE_DATA: PeriodicElement[] =  [];
  dataSource;

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  emails: contactData[];
  filteredEmails: contactData[];
  performFilters():contactData[]{
    return this.emails.filter((email:contactData)=> email.isArchived===false)

  }
  getEmailsFromServer(){
    this.messageService.getMessages().subscribe({
      next:messages => {
        this.emails=messages.result;
        this.filteredEmails=this.performFilters();


        console.log(this.emails);
      }
    })
  }
  markAsRead(id:string){
    this.messageService.updateMessages(id);
    //this.getEmailsFromServer();
    this.LoadEmails();
  }
  markAsUnread(id:string){
    this.messageService.markAsUnread(id, ()=>{
      this.LoadEmails();
    });

  }
  viewDetails(element){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: element.content,
        subject:element.subject
    };



        this.dialog.open(EmailPopupComponent, dialogConfig);
  }





  archiveEmails(id:string){
    this.messageService.archiveMessages(id, ()=>{
      this.LoadEmails();
    });
  }


  LoadEmails(){
    const url = "http://localhost:3000/contact/getAllEmails"   //backend url

    this.http.get<any>(url).subscribe(res => {
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Error...! ", true ? "Retry" : undefined, config);
      } else {
        //this.TABLE_DATA = res.data;
        this.ORIGINAL_TABLE_DATA = res.data;
        this.TABLE_DATA = [];
        this.ORIGINAL_TABLE_DATA.forEach(element=>{
          if(!element.isArchived){
            this.TABLE_DATA.push(element);
          }
        })
        this.TABLE_DATA.sort(a => a.addedon).reverse(); //add response data in to data array
        //this.propicName = res.data.filepath;
        console.log(this.TABLE_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);


      }
    });


  }
  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private messageService: contactService,

  ) {

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA);
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
  }
  ;

  //constructor(private messageService: contactService) { }

  ngOnInit() {
    //this.getEmailsFromServer();
    this.LoadEmails();



  }
  deleteTable(_id){
    //console.log(id);

    const url2 = "http://localhost:3000/contact/deleteEmail/"  //delete data from tha database

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
        this.http.delete<any>(url2 + _id).subscribe(res => {
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

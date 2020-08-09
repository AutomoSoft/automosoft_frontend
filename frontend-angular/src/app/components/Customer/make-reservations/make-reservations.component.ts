import { Component, OnInit,ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
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
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


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
  changeDetection: ChangeDetectionStrategy.OnPush, // added for the calender
  styleUrls: ['./make-reservations.component.scss']
})

export class MakeReservationsComponent implements OnInit {
  // +++****+*+*+*+*+*+*+**+*+**+**+*+*+*+*+*+*+*+*+*

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;


  // added for the calender****++++++*_*_*_*_*_**_**
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

  isShow;
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
    private modal: NgbModal, // ANGULAR CALENDER
  ) {
    if (this.cookies.getCookie("userAuth") != "") {
      this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    }

  }

  ngOnInit() {
    this.isShow = false;
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

        console.log(this.TABLE_DATA_1[0]);
        for (let i = 0; i < this.TABLE_DATA_1.length; i++) {

          var mnths = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
          },
          date = this.TABLE_DATA_1[i].daterequested.split(" ");
      
          let from = [date[3], mnths[date[1]], date[2]].join("-"); // YYYY-MM-DD
          //var from = '11-04-2017' // OR $("#datepicker").val();
          var milliseconds = moment(from, "YYYY-MM-DD").toDate();
          var f = new Date(milliseconds)
          console.log(from);
          console.log(f);

              this.events = [
            ...this.events,
            {
              title: (this.TABLE_DATA_1[i].repairtype).toString() + " at " + this.TABLE_DATA_1[i].time,
              start: startOfDay(f),
              end: endOfDay(f),
              color: colors.red,
              draggable: false,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            },
          ];
        }

        this.dataSource_1 = new MatTableDataSource<PeriodicElement>(this.TABLE_DATA_1);
        console.log("datasource");
        console.log(this.dataSource_1);
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

  cancel(){
    this.isShow = false;
  }

  show(){
    this.isShow = true;
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



    //+++++++++++++= ++++++++++++++++++++++ +++++++++++++++++++

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      console.log("DAY CLICKED");
      console.log(date);
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }
  
    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      console.log("HANDLE EVENT");
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
    addEvent(): void {
      this.events = [
        ...this.events,
        {
          title: 'New event',
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
          color: colors.red,
          draggable: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    }
  
    deleteEvent(eventToDelete: CalendarEvent) {
      this.events = this.events.filter((event) => event !== eventToDelete);
    }
  
    setView(view: CalendarView) {
      console.log("SET VIEW");
      this.view = view;
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTooltipModule } from '@angular/material/tooltip';

//material
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatNativeDateModule,
  MatChipsModule,
  MatSortModule,
  MatRadioModule,
} from '@angular/material';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { NavComponent } from './components/Auth/nav/nav.component';
import { UserlandingComponent } from './components/main/userlanding/userlanding.component';
import { FooterComponent } from './components/Auth/footer/footer.component';

import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { ContactComponent } from './components/main/contact/contact-us/contact.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';
import { RegisterEmployeeComponent } from './components/Admin/register-employee/register-employee.component';
import { RegisterCustomerComponent } from './components/Admin/register-customer/register-customer.component';
import { RegisterSupplierComponent } from './components/Admin/register-supplier/register-supplier.component';
import { MessageComponent } from './components/Admin/messages/message.component';
import { AddItemsComponent } from './components/Admin/add-items/add-items.component';
import { ConfirmationDialogComponent } from './components/Auth/confirmation-dialog/confirmation-dialog.component';
import { SearchUserComponent } from './components/main/search-user/search-user.component';
import { AddOrdersComponent } from './components/StoreKeeper/add-orders/add-orders.component';
import { ApproveOrdersComponent } from './components/Admin/approve-orders/approve-orders.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { SupplierInfoComponent } from './components/Admin/supplier-info/supplier-info.component';
import { StockStatusComponent } from './components/StoreKeeper/stock-status/stock-status.component';
import { ViewHistoryComponent } from './components/Customer/view-history/view-history.component';
import { CreateJobCardComponent } from './components/Foreman/create-job-card/create-job-card.component';
import { WithdrawStockComponent } from './components/Foreman/withdraw-stock/withdraw-stock.component';
import { MakeReservationsComponent } from './components/Customer/make-reservations/make-reservations.component';
import { JobHistoryComponent } from './components/Foreman/job-history/job-history.component';
import { OngoingJobsComponent } from './components/Foreman/ongoing-jobs/ongoing-jobs.component';
import { EmailPopupComponent } from './components/Auth/email-popup/email-popup.component';


import { MycookiesService } from './components/Admin/mycookies.service';
import { AddStockComponent } from './components/StoreKeeper/add-stock/add-stock.component';
import { EditUserComponent } from './components/main/search-user/edit-user/edit-user.component';
import { ViewTechniciansComponent } from './components/Foreman/view-technicians/view-technicians.component';
import { ViewJobComponent } from './components/Foreman/ongoing-jobs/view-job/view-job.component';
import { ReplyEmailComponent } from './components/Admin/reply-email/reply-email.component';
import { StockReportComponent } from './components/StoreKeeper/stock-report/stock-report.component';
import { RequestPurchaseOderComponent } from './components/StoreKeeper/request-purchase-oder/request-purchase-oder.component';
import { AddItemPopupComponent } from './components/Admin/supplier-info/add-item-popup/add-item-popup.component';
import { AddNewVehicleComponent } from './components/main/search-user/add-new-vehicle/add-new-vehicle.component';
import { SelectJobStatusComponent } from './components/Foreman/ongoing-jobs/select-job-status/select-job-status.component';
import { CreateInvoiceComponent } from './components/Accountant/create-invoice/create-invoice.component';
import { InvoiceHistoryComponent } from './components/Accountant/invoice-history/invoice-history.component';
import { NewPurchaseOrderComponent } from './components/Accountant/new-purchase-order/new-purchase-order.component';
import { PurchaseOrderRequestsComponent } from './components/Accountant/purchase-order-requests/purchase-order-requests.component';
//import { ItemDetailsComponent } from './components/StoreKeeper/view-item/item-details/item-details.component';
import { ViewTechnicianJobComponent } from './components/Foreman/view-technicians/view-technician-job/view-technician-job.component';
import { ItemDetailsComponent } from './components/StoreKeeper/stock-status/item-details/item-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    UserlandingComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    AdmindashboardComponent,
    ContactComponent,
    RegisterEmployeeComponent,
    RegisterCustomerComponent,
    RegisterSupplierComponent,
    MessageComponent,
    AddItemsComponent,
    ConfirmationDialogComponent,
    SearchUserComponent,
    AddOrdersComponent,
    ApproveOrdersComponent,
    ProfileComponent,
    SupplierInfoComponent,
    StockStatusComponent,
    ViewHistoryComponent,
    CreateJobCardComponent,
    WithdrawStockComponent,
    MakeReservationsComponent,
    JobHistoryComponent,
    OngoingJobsComponent,
    EmailPopupComponent,
    AddStockComponent,
    EditUserComponent,
    ViewTechniciansComponent,
    ReplyEmailComponent,
    ViewJobComponent,
    StockReportComponent,
    RequestPurchaseOderComponent,
    AddItemPopupComponent,
    AddNewVehicleComponent,
    SelectJobStatusComponent,
    CreateInvoiceComponent,
    InvoiceHistoryComponent,
    NewPurchaseOrderComponent,
    PurchaseOrderRequestsComponent,
    ItemDetailsComponent,
    ViewTechnicianJobComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    LayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    MatGridListModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatChipsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgmgkMY82b8FmbyfP3oex24sZxbEXKWgE'
    }),
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    Ng2SearchPipeModule,
    MatTooltipModule,
    MatSortModule,
    MatRadioModule,
    //PopupModule.forRoot(),
    //ViewChild

  ],
  providers: [MycookiesService],
  bootstrap: [AppComponent],

  entryComponents: [
    ConfirmationDialogComponent,
    EmailPopupComponent,
    ReplyEmailComponent,
    ViewJobComponent,
    StockReportComponent,
    AddNewVehicleComponent,
    AddItemPopupComponent,
    ItemDetailsComponent,
    ViewTechnicianJobComponent
  ],
})
export class AppModule { }

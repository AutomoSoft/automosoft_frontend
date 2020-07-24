import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { UserlandingComponent } from './components/main/userlanding/userlanding.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';
import { ContactComponent } from './components/main/contact/contact-us/contact.component';
import { RegisterEmployeeComponent } from './components/Admin/register-employee/register-employee.component';
import { RegisterCustomerComponent } from './components/Admin/register-customer/register-customer.component';
import { RegisterSupplierComponent } from './components/Admin/register-supplier/register-supplier.component';
import { MessageComponent } from './components/Admin/messages/message.component';
import { AddItemsComponent } from './components/Admin/add-items/add-items.component';
import { AddStockComponent } from './components/StoreKeeper/add-stock/add-stock.component';
import { AddOrdersComponent } from './components/StoreKeeper/add-orders/add-orders.component';
import { ApproveOrdersComponent } from './components/Admin/approve-orders/approve-orders.component';
import { SearchUserComponent } from './components/main/search-user/search-user.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { SupplierInfoComponent } from './components/Admin/supplier-info/supplier-info.component';
import { StockStatusComponent } from './components/StoreKeeper/stock-status/stock-status.component';

import { CreateJobCardComponent } from './components/Foreman/create-job-card/create-job-card.component';
import { JobHistoryComponent } from './components/Foreman/job-history/job-history.component';
import { WithdrawStockComponent } from './components/Foreman/withdraw-stock/withdraw-stock.component';

import { MakeReservationsComponent } from './components/Customer/make-reservations/make-reservations.component';
import { ViewHistoryComponent } from './components/Customer/view-history/view-history.component';
import { OngoingJobsComponent } from './components/Foreman/ongoing-jobs/ongoing-jobs.component';
import { EditUserComponent } from './components/main/search-user/edit-user/edit-user.component';
import { ViewTechniciansComponent } from './components/Foreman/view-technicians/view-technicians.component';
import { ViewJobComponent } from './components/Foreman/ongoing-jobs/view-job/view-job.component';
import { RequestPurchaseOderComponent } from './components/StoreKeeper/stock-status/request-purchase-oder/request-purchase-oder.component';
import { AddNewVehicleComponent } from './components/main/search-user/add-new-vehicle/add-new-vehicle.component';
import { SelectJobStatusComponent } from './components/Foreman/ongoing-jobs/select-job-status/select-job-status.component';
import { NewPurchaseOrderComponent } from './components/Accountant/new-purchase-order/new-purchase-order.component';
import { PurchaseOrderRequestsComponent } from './components/Accountant/purchase-order-requests/purchase-order-requests.component';

import { CreateInvoiceComponent } from './components/Accountant/create-invoice/create-invoice.component';
import { InvoiceHistoryComponent } from './components/Accountant/invoice-history/invoice-history.component';
import { ReservationsComponent } from './components/Admin/reservations/reservations.component';
import { ApproveReservationsComponent } from './components/Foreman/approve-reservations/approve-reservations.component';
import {ApproveReservationsPopupComponent} from './components/Foreman/approve-reservations/approve-reservations-popup/approve-reservations-popup.component';
import { from } from 'rxjs';

const routes: Routes = [

  /****************************************** General Routes **************************************** */

  { path: 'login', component: LoginComponent },
  { path: "", component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: ":id/landing", component: UserlandingComponent },
  { path: "searchUser", component: SearchUserComponent },
  { path: "viewProfile", component: ProfileComponent },
  { path: "editUSer", component: EditUserComponent },
  { path: "addNewVehicle", component: AddNewVehicleComponent },

  /****************************************** Admin Routes ********************************************** */

  { path: ":id/admin_dashboard", component: AdmindashboardComponent },
  { path: "registerEmployee", component: RegisterEmployeeComponent },
  { path: "registerCustomer", component: RegisterCustomerComponent },
  { path: "registerSupplier", component: RegisterSupplierComponent },
  { path: "approveOrders", component: ApproveOrdersComponent },
  { path: "messages", component: MessageComponent },
  { path: "AddItems", component: AddItemsComponent },
  { path: "supplierInfo", component: SupplierInfoComponent },
  { path: "viewReservations", component: ReservationsComponent },


  /****************************************** StoreKeeper Routes **************************************** */

  { path: "addStock", component: AddStockComponent },
  { path: "addOrder", component: AddOrdersComponent },
  { path: "stockStatus", component: StockStatusComponent },
  { path: "requestItem", component: RequestPurchaseOderComponent },



  /****************************************** Customer Routes ******************************************* */

  { path: "makeReservation", component: MakeReservationsComponent },
  { path: "myServices", component: ViewHistoryComponent },

  /****************************************** Foreman Routes ******************************************** */

  { path: "createJob", component: CreateJobCardComponent },
  { path: "jobHistory", component: JobHistoryComponent },
  { path: "ongoingJobs", component: OngoingJobsComponent },
  { path: "viewJob", component: ViewJobComponent },
  { path: "selectJobStatus", component: SelectJobStatusComponent },
  { path: "withdrawStock", component: WithdrawStockComponent },
  { path: "viewTechnicians", component: ViewTechniciansComponent },
  { path: "approveReservations", component: ApproveReservationsComponent },
  { path: "approveReservationsPopup", component: ApproveReservationsPopupComponent },

  /****************************************** Accountant Routes ******************************************** */
  { path: "createInvoice", component: CreateInvoiceComponent },
  { path: "invoiceHistory", component: InvoiceHistoryComponent },
  { path: "newPurchaseOrder", component: NewPurchaseOrderComponent },
  { path: "purchaseOrderRequests", component: PurchaseOrderRequestsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

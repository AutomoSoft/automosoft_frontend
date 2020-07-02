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
import { ViewUserComponent } from './components/main/search-user/view-user/view-user.component';
import { EditUserComponent } from './components/main/search-user/edit-user/edit-user.component';
import { ViewTechniciansComponent } from './components/Foreman/view-technicians/view-technicians.component';


const routes: Routes = [

  /****************************************** General Routes **************************************** */
  { path: 'login', component: LoginComponent },
  { path: "", component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: ":id/landing", component: UserlandingComponent },
  { path: "searchUser", component: SearchUserComponent },
  { path: "viewProfile", component: ProfileComponent },
  { path: "viewUser", component: ViewUserComponent },
  { path: "editUSer", component: EditUserComponent },


  /****************************************** Admin Routes ********************************************** */
  { path: ":id/admin_dashboard", component: AdmindashboardComponent },
  { path: "registerEmployee", component: RegisterEmployeeComponent },
  { path: "registerCustomer", component: RegisterCustomerComponent },
  { path: "registerSupplier", component: RegisterSupplierComponent },
  { path: "approveOrders", component: ApproveOrdersComponent },
  { path: "messages", component: MessageComponent },
  { path: "AddItems", component: AddItemsComponent },
  { path: "supplierInfo", component: SupplierInfoComponent },


  /****************************************** StoreKeeper Routes **************************************** */
  {path:"addStock", component:AddStockComponent},
  {path:"addOrder", component:AddOrdersComponent},
  {path:"stockStatus", component:StockStatusComponent},


  /****************************************** Customer Routes ******************************************* */
  { path: "makeReservation", component: MakeReservationsComponent },
  { path: "myServices", component: ViewHistoryComponent },

  /****************************************** Foreman Routes ******************************************** */
  { path: "createJob", component: CreateJobCardComponent },
  { path: "jobHistory", component: JobHistoryComponent },
  { path: "ongoingJobs", component: OngoingJobsComponent },
  { path: "withdrawStock", component: WithdrawStockComponent },
  { path: "viewTechnicians", component: ViewTechniciansComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

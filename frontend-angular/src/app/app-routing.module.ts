import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { UserlandingComponent } from './components/main/userlanding/userlanding.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';
import { ContactComponent } from './components/main/contact/contact-us/contact.component';
import { RegisterEmployeeComponent } from './components/Admin/register-employee/register-employee.component';
import { RegisterCustomerComponent} from './components/Admin/register-customer/register-customer.component';
import { RegisterSupplierComponent } from './components/Admin/register-supplier/register-supplier.component';
import { MessageComponent } from './components/Admin/messages/message.component';
import { AddItemsComponent } from './components/Admin/add-items/add-items.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:"",component:HomeComponent},
  {path:'contact',component:ContactComponent},

  {path:":id/admin_dashboard",component:AdmindashboardComponent},
  {path:"registerEmployee",component:RegisterEmployeeComponent},
  {path:"registerCustomer",component:RegisterCustomerComponent},
  {path:"registerSupplier",component:RegisterSupplierComponent},
  {path:"messages",component:MessageComponent},
  {path:"AddItems", component:AddItemsComponent},

  {path:":id/landing", component:UserlandingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

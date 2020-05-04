import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { UserlandingComponent } from './components/main/userlanding/userlanding.component';
import { RegisterUserComponent } from './components/Admin/register-user/register-user.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:"registerUser",component:RegisterUserComponent},
  {path:":id/admin_dashboard",component:AdmindashboardComponent},

  {
    path: ":id/landing", component:MainComponent,
    children: [
      {path:"", component:UserlandingComponent}
    ]
  },
  {path:"",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

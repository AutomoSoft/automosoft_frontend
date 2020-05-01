import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlandingComponent } from './userlanding/userlanding.component';
import { RegisterUserComponent } from './Admin/register-user/register-user.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:"",component:HomeComponent},
  {path:"landing",component:UserlandingComponent},
  {path:"registerUser",component:RegisterUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

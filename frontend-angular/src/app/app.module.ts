import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



//material
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule ,
  MatStepperModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatCardModule,

} from '@angular/material';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/Auth/nav/nav.component';
import { UserlandingComponent } from './components/userlanding/userlanding.component';
import { SidebarComponent } from './components/Auth/sidebar/sidebar.component';
import { FooterComponent } from './components/Auth/footer/footer.component';
import { RegisterUserComponent } from './components/Admin/register-user/register-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    UserlandingComponent,
    SidebarComponent,
    FooterComponent,
    RegisterUserComponent,
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
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

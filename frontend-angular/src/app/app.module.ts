import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core'







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
  MatGridListModule,
  MatCheckboxModule,




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
import { SidebarComponent } from './components/Auth/sidebar/sidebar.component';
import { RegisterSupplierComponent } from './components/Admin/register-supplier/register-supplier.component';
import { MessageComponent } from './components/Admin/messages/message.component';




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
    RegisterSupplierComponent,
    MessageComponent,
    SidebarComponent,

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
    MatTabsModule,
    LayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDgmgkMY82b8FmbyfP3oex24sZxbEXKWgE'
      }),
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

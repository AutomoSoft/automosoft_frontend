import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { MatExpansionModule } from '@angular/material/expansion';


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
  MatDatepickerModule,
  MatDialogModule,


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
import { ApproveOrdersComponent } from './components/Admin/approve-orders/approve-orders.component';



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
    ApproveOrdersComponent,
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
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDgmgkMY82b8FmbyfP3oex24sZxbEXKWgE'
      }),
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],

  entryComponents: [
    ConfirmationDialogComponent,
  ],
})
export class AppModule { }

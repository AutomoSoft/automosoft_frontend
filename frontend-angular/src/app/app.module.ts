import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
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

} from '@angular/material';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { NavComponent } from './components/Auth/nav/nav.component';
import { UserlandingComponent } from './components/main/userlanding/userlanding.component';
import { FooterComponent } from './components/Auth/footer/footer.component';
import { RegisterUserComponent } from './components/Admin/register-user/register-user.component';

import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';

import { MainnavigationComponent } from './components/Auth/mainnavigation/mainnavigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    UserlandingComponent,
    FooterComponent,
    RegisterUserComponent,
    MainComponent,
    HomeComponent,
    MainnavigationComponent,
    AdmindashboardComponent,
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
    CarouselModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
    apiKey:'AIzaSyDgmgkMY82b8FmbyfP3oex24sZxbEXKWgE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

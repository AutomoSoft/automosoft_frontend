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
import { NavComponent } from './components/Auth/nav/nav.component';
import { UserlandingComponent } from './components/userlanding/userlanding.component';
import { FooterComponent } from './components/Auth/footer/footer.component';
import { RegisterUserComponent } from './components/Admin/register-user/register-user.component';
<<<<<<< HEAD
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
=======
import { MainnavigationComponent } from './components/Auth/mainnavigation/mainnavigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
>>>>>>> 29e3d6ee340f324f53096725a42bef8126231605


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    UserlandingComponent,
    FooterComponent,
    RegisterUserComponent,
    MainComponent,
    HomeComponent
    MainnavigationComponent,
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

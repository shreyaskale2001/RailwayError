import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { BookingComponent } from './MyComponents/booking/booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './MyComponents/signin/signin.component';
import { SignupComponent } from './MyComponents/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './MyComponents/search/search.component';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { TrainDetailComponent } from './MyComponents/train-detail/train-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookingComponent,
    SigninComponent,
    SignupComponent,
    SearchComponent,
    AdminComponent,
    TrainDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

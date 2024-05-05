import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInUpComponent } from './components/sign-in-up/sign-in-up.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component'
import { CarouselModule } from 'ngx-owl-carousel-o'
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LecturesComponent } from './components/lectures/lectures.component';
import { AddlevelsComponent } from './components/addlevels/addlevels.component';
import { DisplayLecturesComponent } from './components/display-lectures/display-lectures.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    MainComponent,
    ForgetpasswordComponent,
    LecturesComponent,
    AddlevelsComponent,
    DisplayLecturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

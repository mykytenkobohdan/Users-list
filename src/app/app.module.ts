import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { AboutUserComponent } from './about-user/about-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AboutUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' })
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

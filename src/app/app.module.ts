import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { AboutUserComponent } from './about-user/about-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AboutUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' })
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

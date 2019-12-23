import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'; 
import {MatInputModule, 
  MatCardModule, 
  MatMenuModule, 
  MatButtonModule,
   MatToolbarModule, 
  MatProgressSpinnerModule} from '@angular/material'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadpicComponent } from './uploadpic/uploadpic.component';
import { RateComponent } from './rate/rate.component';
import { ToppupsComponent } from './toppups/toppups.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {HttpClientModule} from '@angular/common/http'; 



@NgModule({
  declarations: [
    AppComponent,
    UploadpicComponent,
    RateComponent,
    ToppupsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
     BrowserAnimationsModule, 
     MatInputModule,
      MatCardModule,
       MatMenuModule, 
       MatButtonModule, 
       MatToolbarModule, 
       MatProgressSpinnerModule,
      HttpClientModule, 
      FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxChartsModule } from '@swimlane/ngx-charts';
import { StockComponent } from './components/stock/stock.component';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {ChartsModule} from 'ng2-charts';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    WarningModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  entryComponents:[WarningModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

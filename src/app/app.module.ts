import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { TimePipe } from './time.pipe';
import { TradeComponent } from './trade/trade.component';

import { NavComponent } from './nav/nav.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MarketcapComponent } from './marketcap/marketcap.component';


import { ChartsModule } from 'ng2-charts';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TickerComponent } from './ticker/ticker.component';
import { PriceComponent } from './price/price.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimePipe,
    TradeComponent,
    NavComponent,
    MarketcapComponent,
    TickerComponent,
    PriceComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgbModule,         
    ChartsModule,
  






  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

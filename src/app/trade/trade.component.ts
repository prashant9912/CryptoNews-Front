import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  ex="Binance";

data:any = [];

trade;
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.subscribe('binance');
  }
  ngOnDestroy()	{

    this.trade.close();
}

  async subscribe(d){

    setTimeout(() => {
      this.spinner.show();
    }, 1);

    this.trade = new WebSocket('wss://ws.coincap.io/trades/'+d);

    // trade.close(); 

      this.trade.onopen = ()=>{
        this.spinner.hide();
      }
      
this.trade.onmessage = (msg)=>{
this.data.unshift(JSON.parse(msg.data));
// console.log(this.data); 

if (this.data.length > 15) this.data.pop();
}
  }

exchange(d){

this.trade.close();
this.data=[];

this.subscribe(d);
this.ex = d;
}

}

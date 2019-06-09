import { Component, OnInit } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';


import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

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




public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
public pieChartData: number[] = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
// public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];



}

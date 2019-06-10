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

  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  ex = "Binance";

  data: any = [];

  trade;
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.subscribe('binance');

    this.clock();


  }
  ngOnDestroy() {

    this.trade.close();
  }

  async subscribe(d) {

    setTimeout(() => {
      this.spinner.show();
    }, 1);

    this.trade = new WebSocket('wss://ws.coincap.io/trades/' + d);

    // trade.close(); 

    this.trade.onopen = () => {
      this.spinner.hide();
    }

    this.trade.onmessage = (msg) => {

      this.record(JSON.parse(msg.data)); // for the bot 
      this.updateChart(JSON.parse(msg.data));  //updatechart

      this.data.unshift(JSON.parse(msg.data));
      // console.log(this.data); 

      if (this.data.length > 15) this.data.pop();
    }
  }

  exchange(d) {

    this.reset();

    this.trade.close();
    this.data = [];

    this.subscribe(d);
    this.ex = d;
  }




  public pieChartOptions: ChartOptions = {
    tooltips: {
      enabled: false
    },
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
  public pieChartLabels: Label[] = ['Buy', 'Sell'];
  public pieChartData = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],
    },
  ];




  bot = [];
  record(dd) {

    if (dd.base == 'edo' && dd.direction == 'buy') {//conditions 

      this.bot.push(dd);
      console.log(this.bot);

    }

  }

buy = 0;
sell = 0;

orderTime= 1; 

  updateChart(dd) {

    if (dd.direction == 'buy') {
      this.buy+= dd.price * dd.volume;
    }
    else {
      this.sell+= dd.price * dd.volume;
    }
      

    this.pieChartData = [this.buy, this.sell];

  }

  reset(){ 
    this.sell = 0;
    this.buy = 0;
  this.pieChartData = [0, 0];
  }
  order(t){

    this.reset();
    this.orderTime = t;
    this.clock();
  }

  clock(){
    setInterval(e=>{
      this.reset();
    }, (60000 * this.orderTime));
  }

}

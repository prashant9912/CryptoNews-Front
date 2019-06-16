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

  public base = "";
  public quotes = "";


  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  ex = "binance";

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

  async subscribe(d, base = "", quotes = "") {

    setTimeout(() => {
      this.spinner.show();
    }, 1);

    console.log(d)
    this.trade = new WebSocket('wss://ws.coincap.io/trades/' + d);

    // trade.close(); 

    this.trade.onopen = () => {
      this.spinner.hide();
    }

    this.trade.onmessage = (ms) => {
let msg = JSON.parse(ms.data);

      if (base != "" && quotes != "") {
        if (msg.base == this.base && msg.quote == this.quotes) {
          this.call(msg)
        }
      }
      else if (base != "") {
        // console.log(msg);
        if (msg.base == this.base)
          this.call(msg)
      }

      else if (quotes != "") {
     
        if (msg.quote == this.quotes)
          this.call(msg)
      }
      else this.call(msg)




    }
  }

  call(msg) {  //call to udpate the data
    this.record(msg); // for the bot 
    this.updateChart(msg);  //updatechart

    this.data.unshift(msg);
    // console.log(this.data); 

    if (this.data.length > 15) this.data.pop();
  }


  exchange(d) {

    this.reset();

    this.trade.close();
    this.data = [];

    this.subscribe(d);
    this.ex = d;

this.base = "";
this.quotes = "";
this.clock()
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
  public pieChartLabels: Label[] = ['Bought', 'Sold'];
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

  orderTime = 1;

  updateChart(dd) {

    if (dd.direction == 'buy') {
      this.buy += dd.price * dd.volume;
    }
    else {
      this.sell += dd.price * dd.volume;
    }


    this.pieChartData = [this.buy, this.sell];

  }

  reset() {
    this.sell = 0;
    this.buy = 0;
    this.pieChartData = [0, 0];
  }
  order(t) {

    this.reset();
    this.orderTime = t;
    this.clock();
  }


  clo;

  clock() {
    clearInterval(this.clo);

    this.clo = setInterval(e => {
      this.reset();
      console.log("timer reset")
    }, (60000 * this.orderTime));
  }


  filter(){

    this.reset();

    this.trade.close();
    this.data = [];

    
    if(this.base!="" && this.quotes!="" ){
      this.subscribe(this.ex,"1","1");  

    }
      else if(this.base!=""){
        this.subscribe(this.ex,"1");  
      }
      else if(this.quotes!=""){
        this.subscribe(this.ex,"","1");  
      }
      else
        this.subscribe(this.ex);   
        
  }
}

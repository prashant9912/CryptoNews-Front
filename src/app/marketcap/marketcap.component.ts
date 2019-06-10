import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { async } from 'q';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-marketcap',
  templateUrl: './marketcap.component.html',
  styleUrls: ['./marketcap.component.css']
})
export class MarketcapComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { 

}
  data;
  ticker;

  api = "https://api.coinmarketcap.com/v1/global/";
  api2 = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';


  ngOnInit() {
    this.getData()
    .then(e=>{
      console.log(1);
      this.spinner.hide(); //hide the loader
      this.drawChart();
    })
  }

   getData() {

    setTimeout(() => {
      this.spinner.show();
    }, 1);

    return new Promise(async(res, rej) => {
      await fetch(this.api)
        .then(e => {
          return e.json();
        }).then(data => {
          console.log(data);
          this.data = data;
        })

        await fetch(this.api2)
        .then(e => {
          return e.json();
        }).then(data => {
          console.log(data);
          this.ticker = data;
        })
       this.data;
       this.ticker;
      
       await res();
        
    });
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
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,153,0,0.6)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)',
              'rgba(41,160,107,0.3)',
              'rgba(252,127,98 ,0.3)',
              'rgba(93,20,65 ,0.3)',
              'rgba(161,209,229  ,0.3)',
              'rgba(73,191,61   ,0.3)',
              'rgba(145,61,213   ,0.3)',
              'rgba( 242,169,152    ,0.3)',
             
              
      ],
    },
  ];


  coins=[];
  per=[];

  drawChart(){
let totalper=0;

this.ticker.forEach(element => {
  this.coins.push(element.id);

  let per= (element.market_cap_usd / this.data.total_market_cap_usd )*100 ;
  totalper+=per;
  this.per.push(per);
});

this.coins.push('others');
this.per.push(100-totalper);

this.pieChartLabels = this.coins;
this.pieChartData= this.per;
console.log(this.coins);
console.log(totalper);




  }

}

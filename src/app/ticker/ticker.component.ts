import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss']
})
export class TickerComponent implements OnInit {

api="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC,BCH,EOS,BNB,BSV,XLM,TRX&tsyms=USD"

data; 

ticker=[];



  constructor() { }

  ngOnInit() {
    this.getTicker();
    setInterval(e=>{
      this.getTicker();
    },60000);

    
  }

  getTicker(){

    fetch(this.api)
    .then(d=>{
      return d.json();
    }).then(d=>{
        this.data=d.DISPLAY;
      // console.log(this.data);
     
      Object.keys(this.data).forEach((key)=>{
          
            let ss = {
              'coin':`${key}`,
              'data':this.data[key].USD
            }
            this.ticker.push(ss);
      }
        );

        console.log(this.ticker);

    })

  }


}

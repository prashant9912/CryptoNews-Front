import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

 
api="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC,BCH,EOS,BNB,BSV,XLM,TRX,XMR&tsyms=USD"

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
    this.ticker=[];
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

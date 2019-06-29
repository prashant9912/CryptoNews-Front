import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

// api = "http://localhost:2000/"; //NEWS~A
api = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';  //NEWS~B

data:any;

  constructor(private spinner: NgxSpinnerService) { 


setInterval(e=>{
  this.getNews(0); // auto update off
},60000);
    
  }

  ngOnInit() {
   
    this.getNews().then(e=>{
  
      console.log(this.data); 

    })


  }


  async getNews(a=1){

    if(a==1){
    setTimeout(() => {
      this.spinner.show();
    }, 1);
  }

    return new Promise((res,rej)=>{

      fetch(this.api).then(d=>{
        return d.json();
      }).then(da=>{
        // this.data = da;
        this.data = da.Data;// NEWS~b
      }).then(()=>{
          res();  
          this.spinner.hide();// resolve the promise;
      }).catch(e=>{
          rej(e); 
      }) // reject the promise 


    })

  }


}

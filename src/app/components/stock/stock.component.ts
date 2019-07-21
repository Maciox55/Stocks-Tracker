import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SearchService} from '../../services/search.service';
import { Stock } from 'src/app/interfaces/stock';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
 @Input() stock: Stock;
 @Output() remove = new EventEmitter<string>();

 public stockData;
 public lineChartLabels;
 public lineChartType = 'line';
 public lineChartLegend = false;
 public lineChartPlugins = {};
 public lineChartOptions = {
  // All of my other bar chart option here

  plugins:{
    pan:{
      enabled: true,
      mode:'x'
    },
    zoom:{
      enabled:true,
      mode:'x'
    }
  },
  scales: {
      yAxes: [{
          ticks: {
              steps : 5,
              fontColor: "white",
              //beginAtZero: true,
              //min:0
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
    }]
  },
  elements: 
    { 
        point: 
        {
            radius: 0,
            hitRadius: 5,
            hoverRadius: 3,
            hoverBorderWidth: 0
        }
    },
  responsive: true,
  maintainAspectRatio: true,
  devicePixelRatio:1,
  
};

public lineChartColors = [
  { // first color
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(225,255,255,0.7)',
    pointBackgroundColor: 'rgba(225,255,255,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(225,10,24,0.2)'
  }];

  constructor(private searchService: SearchService) {
    this.lineChartLabels = [];

  }

  ngOnInit() {
    this.searchService.stockQuote(this.stock['1. symbol']).subscribe((result) => {
      this.stock.open = result['Global Quote']['08. previous close'];
      this.stock.close = result['Global Quote']['05. price'];
      this.stock.low = result['Global Quote']['04. low'];
      this.stock.high = result['Global Quote']['03. high'];
      this.stock.percentChange = result['Global Quote']['10. change percent'];
      console.log(this.stock.low, this.stock.high);

    });
    this.searchService.stockDetail(this.stock['1. symbol']).subscribe((result) => {
      this.stockData = [];
      // console.log(result['Time Series (5min)']);
      // this.stockData = result['Time Series (5min)'];
      
      for (const key in result['Time Series (15min)']) {
        this.stockData.push({data: result['Time Series (15min)'][key]['4. close']});
      }

      this.stockData.reverse();
      console.log(this.stockData);
      //this.lineChartOptions.scales.yAxes[0].ticks.min = Math.min.apply(this,this.stockData.data);
      // this.lineChartOptions.scales.yAxes[0].ticks.max = Math.max.apply(this,this.stockData.data)+1;
     
      this.lineChartLabels = Object.keys(result['Time Series (15min)']);
      this.lineChartLabels.reverse();
      console.log();
    }, (error) => {
      console.log(error);
    });
  }

  removeSelf() {
    this.remove.emit('remove');

  }
}

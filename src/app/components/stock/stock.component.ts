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
              beginAtZero: true
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
  responsive: true,
  maintainAspectRatio: true,
  devicePixelRatio:1,
  
};
  constructor(private searchService: SearchService) {
    this.lineChartLabels = [];

  }

  ngOnInit() {
    this.searchService.stockQuote(this.stock['1. symbol']).subscribe((result) => {
      this.stock.open = result['Global Quote']['08. previous close'];
      this.stock.close = result['Global Quote']['05. price'];
      this.stock.low = result['Global Quote']['04. low'];
      this.stock.high = result['Global Quote']['03. high'];
      console.log(this.stock.low, this.stock.high);

    });
    this.searchService.stockDetail(this.stock['1. symbol']).subscribe((result) => {
      this.stockData = [];
      // console.log(result['Time Series (5min)']);
      // this.stockData = result['Time Series (5min)'];

      for (const key in result['Time Series (15min)']) {
        this.stockData.push({data: result['Time Series (15min)'][key]['4. close']});
      }
      console.log(this.stockData);
      // this.lineChartOptions.scales.yAxes[0].ticks.min = Math.min.apply(this,this.stockData.data)-1;
      // this.lineChartOptions.scales.yAxes[0].ticks.max = Math.max.apply(this,this.stockData.data)+1;
     

      this.lineChartLabels = Object.keys(result['Time Series (15min)']);
      console.log();
    }, (error) => {
      console.log(error);
    });
  }

  removeSelf() {
    this.remove.emit('remove');

  }
}

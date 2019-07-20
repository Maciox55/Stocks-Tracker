import { Component } from '@angular/core';
import {SearchService} from './services/search.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {Chart} from 'chart.js';
import { Subject, from } from 'rxjs';
import { Stock } from './interfaces/stock';
import {MatDialog,MatDialogRef } from '@angular/material/dialog'
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stocksapp';
  stocks: Stock[];
  warningModal: MatDialogRef<WarningModalComponent>;
  searchResults: any;
  searchTerm$ = new Subject<string>();
  constructor(private searchService: SearchService, private dialog: MatDialog) {
    this.dialog.open(WarningModalComponent, {
      height: '450px',
      width: '600px',
    });

    this.stocks = [];
    if (localStorage.getItem('stocks') != null) {
      const data = localStorage.getItem('stocks');
      this.stocks =  JSON.parse(data) as Stock[];
    }
    this.searchService.search(this.searchTerm$).subscribe((results: any) => {
      console.log(results);
      this.searchResults =  results.bestMatches as Stock[];
    });
  }
  foo(f: any) {
    if (this.stocks.length < 2) {
      this.stocks.push( f as Stock);
      localStorage.setItem('stocks', JSON.stringify(this.stocks));
      console.log( f as Stock);
    } else {
      console.log('You can only follow 2 stocks, sorry... API call restriction :(');
    }
  }

  removeStock(event) {
    for (let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i]['1. symbol'] === event['1. symbol']) {
        this.stocks.splice(i, 1);
        localStorage.setItem('stocks', JSON.stringify(this.stocks));
      }
    }
  }

}

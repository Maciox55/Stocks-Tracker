import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = 'https://cloud.iexapis.com';
  iexToken = '?token=pk_d1645e3917654267af0251616610dfea'
  searchUrl = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&datatype=json&';
  intradayUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=';
  quoteUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
  apiKey = 'O4UN39MLTLEUZVCW';
  constructor(private HTTP: HttpClient) {}

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400)).pipe(distinctUntilChanged()).pipe(switchMap(term => this.searchEntries(term)));
  }
  searchIEX(terms: Observable<string>) {
    return terms.pipe(debounceTime(400)).pipe(distinctUntilChanged()).pipe(switchMap(term => this.searchEntriesIEX(term)));
  }
  searchEntries(term) {
    return this.HTTP.get(this.searchUrl + 'keywords=' + term + '&apikey=' + this.apiKey);
  }
  searchEntriesIEX(term) {
    return this.HTTP.get(this.baseUrl + '/search/'+term);
  }
  stockDetail(symbol) {
    return this.HTTP.get(this.intradayUrl + symbol + '&interval=15min&apikey=' + this.apiKey);
  }
  stockQuote(symbol) {
    return this.HTTP.get(this.quoteUrl + symbol + '&apikey=' + this.apiKey);
  }
}

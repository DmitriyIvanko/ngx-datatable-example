import { Component } from '@angular/core';
import { Page } from "./model/page";
import { MockServerResultsService } from "./mock-server-results-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page = new Page();
  rows = [];
  cache: any = {};

  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    // cache results
    // if(this.cache[this.page.pageNumber]) return;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      // 
      // // calc start
      // const start = this.page.pageNumber * this.page.size;
      // 
      // // copy rows
      // const rows = [...this.rows];
      // 
      // // insert rows into new position
      // rows.splice(start, 0, ...pagedData.data);
    
      // set rows to our new rows
      this.rows = pagedData.data;
    
      // add flag for results
      // this.cache[this.page.pageNumber] = true;
    });
  }

}

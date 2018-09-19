import { Component } from '@angular/core';
import { Page } from "./model/page";
import { CorporateEmployee } from './model/corporate-employee';
import { MockServerResultsService } from "./mock-server-results-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page = new Page();
  rows = new Array<CorporateEmployee>();

  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;

      this.rows = pagedData.data;
    });
  }

}

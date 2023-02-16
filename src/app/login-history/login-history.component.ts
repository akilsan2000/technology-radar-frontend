import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryService } from '../_services';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent {
  loginhistory: {username: string, logindatetime: string}[] = [];
  displayedColumns: string[] = ['username', 'logindatetime'];

  constructor(
    private historyService: HistoryService,
    private location: Location
  ) { }

  ngOnInit(){
    this.historyService.getHistory()
      .subscribe(history => {
        this.loginhistory = history;
        this.loginhistory.map(element => {
          element.logindatetime = new Date(element.logindatetime).toLocaleString();

        });
      });
  }

  goBack(): void {
    this.location.back();
  }
}

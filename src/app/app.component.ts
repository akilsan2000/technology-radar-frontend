import { Component } from '@angular/core';
import { Role, User } from './_models';
import { AuthService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Technologie Radar';

  user: User | null = null;

  constructor(private authService: AuthService) {
      this.authService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
      return this.user && this.user.role === Role.CTO;
  }

  logout() {
      this.authService.logout();
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './../../../_services/auth.service';
import { ROUTE_PATH } from 'src/app/_constants/route-name.constant';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  constructor(
    public authService: AuthService,
    private router: Router) { }

  ngAfterViewInit() { }

  logout() {
    const isLoggedOut = this.authService.logout();

    if (isLoggedOut) {
      this.router.navigate([ROUTE_PATH.LOGIN]);
    }
  }
}

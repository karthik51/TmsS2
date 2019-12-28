import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertifyService } from './_services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routerSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {
  }

  ngOnInit() {
    //this.authService.assignLoggedInUserName()

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      } else if (event instanceof NavigationStart) {
        this.alertify.clear();
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}

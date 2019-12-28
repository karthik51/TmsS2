import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "../_services/auth.service";
import { ROUTE_PATH } from '../_constants/route-name.constant';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(public authService: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const navigationRoute: string = route.data.navigationRoute; // added in app-routing.module
        if (this.authService.loggedIn() && this.authService.isAdminRole ) {
           this.router.navigate([ROUTE_PATH.ERROR, 401]);
            return false;
        }

        const expectedRole: string[] = route.data.expectedRoles;
        if (!this.authService.loggedIn() || !this.authService.isAdminRole) {
            this.router.navigate([ROUTE_PATH.ERROR, 401]);
            return false;
        }

        return true;
    }
}

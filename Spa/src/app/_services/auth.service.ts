import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROLE_NAME } from '../_constants/role-name.constant';
import { IRegisterUserModel } from '../_models/register-user.model';
import { IUserInfoModel } from '../_models/user-info.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    jwtHelper = new JwtHelperService();
    loggedInUserName: string;
    accountApiUrl: string = environment.baseApiUrl + '/account';

    constructor(private http: HttpClient, private router: Router) { }

    login(authRequest: any): Observable<any> {
        return this.http.post(this.accountApiUrl + '/login', authRequest).pipe(
            map((response: any) => {
                const user = response;

                if (user) {
                    sessionStorage.setItem('token', user.token);
                    this.assignLoggedInUserName();
                }
            })
        );
    }

    loggedIn() {
        const token = sessionStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    assignLoggedInUserName(): void {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.loggedInUserName = this.jwtHelper.decodeToken(token).unique_name;
        }
    }

    get decodedToken(): any {
        const token = sessionStorage.getItem('token');
        if (token) {
            return this.jwtHelper.decodeToken(token);
        }
    }

    get userLoggedInRoles(): Array<string> {
        let roles: any = this.parseValueFromToken('role');
        return roles as Array<string>;
    }

    get userLoggedInRolesAsString(): string {
        let roles: any = this.userLoggedInRoles;
        return (roles instanceof Array) ? roles.join(', ') : roles;
    }

    get loggedInUserId(): number {
        return +this.parseValueFromToken('nameid');
    }

    get isAdminRole(): boolean {
        return (this.userLoggedInRoles.indexOf(ROLE_NAME.ADMIN) > -1)
    }

    get isEmployeeRole(): boolean {
        return (this.userLoggedInRoles.indexOf(ROLE_NAME.EMPLOYEE) > -1)
    }

    get isCustomerRole(): boolean {
        return (this.userLoggedInRoles.indexOf(ROLE_NAME.CUSTOMER) > -1)
    }

    parseValueFromToken(propertyName: string): string {
        let parsedValue: string = null;

        if (this.decodedToken) {
            Object.keys(this.decodedToken).forEach(key => {
                if (key.toUpperCase().indexOf(propertyName.toUpperCase()) >= 0) {
                    parsedValue = this.decodedToken[key];
                    return parsedValue;
                }
            })
        }

        return parsedValue;
    }

    logout(): boolean {
        const token = sessionStorage.getItem('token');

        if (token) {
            sessionStorage.removeItem('token');
            return true;
        }

        return false;
    }

    scrollTop(): void {
        window.scrollTo(0, 0);
    }

    registerUser(registerUser: IRegisterUserModel): Observable<IUserInfoModel> {
        return this.http.post<IUserInfoModel>(this.accountApiUrl, registerUser);
    }
}
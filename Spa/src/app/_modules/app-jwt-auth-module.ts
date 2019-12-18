import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";

export function tokenGetter(): string {
    return sessionStorage.getItem('token');
}

@NgModule({
    imports: [
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [environment.domain],
                blacklistedRoutes: [environment.authApiUrl]
            }
        })
    ],
    exports: [JwtModule]
})
export class AppJwtAuthModule { }
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppJwtAuthModule } from './_modules/app-jwt-auth-module';
import { AppBootstrapModule } from './_modules/app-bootstrap.module';
import { AppProgressBarModule } from './_modules/app-progress-bar.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';

// Providers
import { ErrorInterceptorProvider } from './_shared/error.interceptor';

// Handlers
import { AppErrorHandler } from './_shared/error-handlers/app-error-handler';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/auth/login/login.component';
import { ErrorComponent } from './_shared/components/error/error.component';
import { NavComponent } from './_shared/components/nav/nav.component';
import { NavigationComponent } from './_shared/components/header-navigation/navigation.component';
import { SidebarComponent } from './_shared/components/sidebar/sidebar.component';
import { HomeComponent } from './_components/home/home.component';
import { RegisterVehicleComponent } from './_components/employee/register-vehicle/register-vehicle.component';
import { ConfirmRideComponent } from './_components/employee/confirm-ride/confirm-ride.component';
import { ViewSummaryComponent } from './_components/employee/view-summary/view-summary.component';
import { BookARideComponent } from './_components/customer/book-a-ride/book-a-ride.component';
import { ViewPastRidesComponent } from './_components/customer/view-past-rides/view-past-rides.component';
import { ViewAllBookingsComponent } from './_components/admin/view-all-bookings/view-all-bookings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    NavComponent,
    NavigationComponent,
    SidebarComponent,
    HomeComponent,
    RegisterVehicleComponent,
    ConfirmRideComponent,
    ViewSummaryComponent,
    BookARideComponent,
    ViewPastRidesComponent,
    ViewAllBookingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppBootstrapModule,
    AppJwtAuthModule,
    AppProgressBarModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  providers: [
    ErrorInterceptorProvider,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

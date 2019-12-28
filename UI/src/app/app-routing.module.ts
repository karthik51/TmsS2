import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_PATH } from './_constants/route-name.constant';
import { LoginComponent } from './_components/auth/login/login.component';
import { ErrorComponent } from './_shared/components/error/error.component';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ViewSummaryComponent } from './_components/employee/view-summary/view-summary.component';
import { BookARideComponent } from './_components/customer/book-a-ride/book-a-ride.component';
import { VehicleCategoryResolver } from './_resolvers/vehicle-category.resolver';
import { ViewPastRidesComponent } from './_components/customer/view-past-rides/view-past-rides.component';
import { ViewPastRidesResolver } from './_resolvers/view-past-rides.resolver';
import { ViewAllBookingsComponent } from './_components/admin/view-all-bookings/view-all-bookings.component';
import { ViewAllBookingResolver } from './_resolvers/view-all-bookings.resolver';
import { BookingAssignedToEmployeeResolver } from './_resolvers/booking-assigned-to-employee.resolver';


const routes: Routes = [
  { path: ROUTE_PATH.LOGIN, component: LoginComponent },
  { path: ROUTE_PATH.ERROR + '/:id', component: ErrorComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: ROUTE_PATH.HOME,
        component: HomeComponent
      },
      {
        path: ROUTE_PATH.ADMIN.MAIN,
        children: [
          {
            path: ROUTE_PATH.ADMIN.VIEW_ALL_BOOKINGS,
            component: ViewAllBookingsComponent,
           // resolve: {
             // bookingDetails: ViewAllBookingResolver
            //}
          }
        ]
      },
      {
        path: ROUTE_PATH.EMPLOYEE.MAIN,
        children: [
          {
            path: ROUTE_PATH.EMPLOYEE.VIEW_SUMMARY,
            component: ViewSummaryComponent,
            resolve: {
              assignedBookings: BookingAssignedToEmployeeResolver
            }
          }
        ]
      },
      {
        path: ROUTE_PATH.CUSTOMER.MAIN,
        children: [
          {
            path: ROUTE_PATH.CUSTOMER.VIEW_PAST_RIDES,
            component: ViewPastRidesComponent,
            resolve: {
              pastRides: ViewPastRidesResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

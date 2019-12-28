import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingDetailModel } from 'src/app/_models/booking-details.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { BadRequestError } from './../../../_shared/error-handlers/bad-request-error';

@Component({
  selector: 'app-confirm-ride',
  templateUrl: './confirm-ride.component.html',
  styleUrls: ['./confirm-ride.component.css']
})
export class ConfirmRideComponent implements OnInit {

  openBookings: BookingDetailModel[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(resolve => {      
      this.openBookings = resolve.openBookings;
    });
  }

  acceptBooking(bookingId: number): void {
    this.employeeService.acceptUserBooking(bookingId)
      .subscribe(accepted => {
        if (accepted) {
          this.alertify.success('You have successfully confirmed the ride!');
          this.openBookings = this.openBookings.filter(booking => booking.bookingDetailsId !== bookingId);
        }
      }, error => {
        if (error instanceof BadRequestError) {
          this.alertify.error(error.originalError);
        }
      });
  }
}

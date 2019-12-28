import { AlertifyService } from './../../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookingDetailModel } from 'src/app/_models/booking-details.model';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.css']
})
export class ViewSummaryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  bookingDetails: BookingDetailModel[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(resolve => {

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };

      this.bookingDetails = resolve.assignedBookings;
      setTimeout(() => {
        this.dtTrigger.next();
      });
    });
  }

  completeRide(bookingDetailsId: string) {
    this.employeeService.completeRide(bookingDetailsId)
      .subscribe(isRideCompleted => {
        const bookingDetails = this.bookingDetails.find(bd => bd.id == bookingDetailsId);
        if (bookingDetails) {
          bookingDetails.isRideCompleted = isRideCompleted;

          if (isRideCompleted) {
            this.alertify.success('You have successfully completed the ride!');
          } else {
            this.alertify.success('Unable to mark the ride as complete. Please try later');
          }
        }

      }, error => {
        this.alertify.error("Could not mark the ride as complete!");
      });
  }
}

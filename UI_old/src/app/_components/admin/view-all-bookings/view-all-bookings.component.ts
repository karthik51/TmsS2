import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BookingDetailModel } from 'src/app/_models/booking-details.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-bookings',
  templateUrl: './view-all-bookings.component.html',
  styleUrls: ['./view-all-bookings.component.css']
})
export class ViewAllBookingsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  bookingDetails: BookingDetailModel[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(resolve => {
      this.bookingDetails = resolve.bookingDetails;
    });

    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

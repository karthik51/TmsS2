import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingDetailModel } from 'src/app/_models/booking-details.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-past-rides',
  templateUrl: './view-past-rides.component.html',
  styleUrls: ['./view-past-rides.component.css']
})
export class ViewPastRidesComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  bookingDetails: BookingDetailModel[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(resolve => {

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };

      this.bookingDetails = resolve.pastRides;
      setTimeout(() => {
        this.dtTrigger.next();
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

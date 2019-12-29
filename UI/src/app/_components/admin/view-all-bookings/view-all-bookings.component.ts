import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BookingDetailModel } from 'src/app/_models/booking-details.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { Observable } from 'rxjs';

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
    private route: ActivatedRoute,
    private adminService: AdminService,
  ) { }
   
  ngOnInit() {
    this.adminService.getAllBookings().subscribe(resolve => {

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      
      this.bookingDetails = resolve;
      setTimeout(() => {
        this.dtTrigger.next();
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

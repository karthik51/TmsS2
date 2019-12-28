import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IVehicleCategoryModel } from 'src/app/_models/vehicle-cateogry.model';
import { CustomerService } from 'src/app/_services/customer.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { BookingDetailModel } from 'src/app/_models/booking-details.model';
import { BadRequestError } from 'src/app/_shared/error-handlers/bad-request-error';

@Component({
  selector: 'app-book-a-ride',
  templateUrl: './book-a-ride.component.html',
  styleUrls: ['./book-a-ride.component.css']
})
export class BookARideComponent implements OnInit {

  bookingForm: FormGroup;
  vehicleCategories: IVehicleCategoryModel[]
  vehicleImage: string;
  bookingDetail: BookingDetailModel;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(resolve => {
      this.bookingDetail = resolve.bookingDetail;
      this.vehicleCategories = resolve.vehicleCategories;
    });
    this.bookingForm = this.buildForm();
  }

  get BookingForm() {
    return this.bookingForm.controls;
  }

  buildForm(): FormGroup {
    return this.fb.group({
      fromLocation: [null, Validators.required],
      toLocation: [null, Validators.required],
      vehicleCategoryId: [null, Validators.required]
    });
  }

  bookRide(): void {
    if (!this.bookingDetail) {
      this.customerService.bookRide(this.bookingForm.value)
        .subscribe(response => {
          if (response) {
            this.alertify.success('Your ride has been booked successfully!');
            this.clearForm();
          }
        }, error => {
          if (error instanceof BadRequestError) {
            this.alertify.error(error.originalError);
          }
        });
    } else {
      this.alertify.error('You already have an active ride. Please cancel it before placing another request');
    }
  }

  cancelRide(bookingId: string): void {
    this.alertify.confirm('Are you sure you want to cancel this ride?', () => {
      this.customerService.cancelRide(bookingId)
        .subscribe(response => {
          if (response) {
            this.alertify.success('Your ride has been cancelled')
            this.bookingDetail = null;
          }
        });
    });
  }

  clearForm(): void {
    this.bookingForm.reset();
    this.vehicleImage = null;
  }

  onCategoryTypeChange(vehicleCategoryId: number): void {
    const vehicleCategory = this.vehicleCategories.find(category => category.vehicleCategoryId === vehicleCategoryId);
    this.vehicleImage = vehicleCategory ? vehicleCategory.vehicleImage : null;
  }
}
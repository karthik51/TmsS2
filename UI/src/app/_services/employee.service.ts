import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVehicleCategoryModel } from '../_models/vehicle-cateogry.model';
import { BookingDetailModel } from '../_models/booking-details.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private registationRoute: string = environment.baseApiUrl + '/registration';
    private bookingRoute: string = environment.baseApiUrl + '/trips';

    constructor(private http: HttpClient) {
    }

    getVehicleCategories(): IVehicleCategoryModel[] {
     
     return [{  "vehicleCategoryId": 1, "vehicleCategoryType": "Mini","ratePerKm": 10, "vehicleImage": "Mini.png"},
     { "vehicleCategoryId": 2, "vehicleCategoryType": "Micro","ratePerKm": 8, "vehicleImage": "Micro.png"},
     { "vehicleCategoryId": 3, "vehicleCategoryType": "Prime","ratePerKm": 15, "vehicleImage": "Prime.png"} ,
     { "vehicleCategoryId": 4, "vehicleCategoryType": "Auto","ratePerKm": 6, "vehicleImage": "Auto.png"} 
    ];      
    }  

    getBookingsAssignedToEmployee(name: string): Observable<BookingDetailModel> {
        return this.http.get<BookingDetailModel>(this.bookingRoute + '/GetTripsForEmployee?username='+ name);
    }

    completeRide(bookingDetailsId: string): Observable<boolean> {
        return this.http.get<boolean>(this.bookingRoute + '/completeRide/' + bookingDetailsId);
    }
}

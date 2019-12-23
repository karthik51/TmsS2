import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVehicleCategoryModel } from '../_models/vehicle-cateogry.model';
import { IRegisterVehicleModel } from '../_models/register-vehicle.model';
import { IRegisteredVehicleDetailsModel } from '../_models/registered-vehicle-details.model';
import { BookingDetailModel } from '../_models/booking-details.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private registationRoute: string = environment.baseApiUrl + '/registration';
    private bookingRoute: string = environment.baseApiUrl + '/booking';

    constructor(private http: HttpClient) {
    }

    getVehicleCategories(): Observable<IVehicleCategoryModel[]> {
        return this.http.get<IVehicleCategoryModel[]>(this.registationRoute + '/vehicleCategories');
    }

    getRegisterdVehicleDetails(userId: number): Observable<IRegisteredVehicleDetailsModel> {
        return this.http.get<IRegisteredVehicleDetailsModel>(this.registationRoute + '/' + userId);
    }

    registerNewVehicle(registerVehicle: IRegisterVehicleModel): Observable<boolean> {
        return this.http.post<boolean>(this.registationRoute + '/vehicle', registerVehicle);
    }

    updateRegistedVehicle(userId: number, registerVehicle: IRegisterVehicleModel): Observable<boolean> {
        return this.http.put<boolean>(this.registationRoute + '/' + userId, registerVehicle);
    }

    getBookingDetailByUserId(userId: number): Observable<BookingDetailModel> {
        return this.http.get<BookingDetailModel>(this.bookingRoute + '/byUserId/' + userId);
    }

    getOpenBookingsForEmployee(): Observable<BookingDetailModel[]> {
        return this.http.get<BookingDetailModel[]>(this.bookingRoute + '/openBookingsForEmployee');
    }

    acceptUserBooking(bookingId: number): Observable<boolean> {
        return this.http.get<boolean>(this.bookingRoute + '/acceptUserBooking/' + bookingId);
    }

    getBookingsAssignedToEmployee(): Observable<BookingDetailModel> {
        return this.http.get<BookingDetailModel>(this.bookingRoute + '/assignedToEmployee');
    }

    completeRide(bookingDetailsId: number): Observable<boolean> {
        return this.http.get<boolean>(this.bookingRoute + '/completeRide/' + bookingDetailsId);
    }
}

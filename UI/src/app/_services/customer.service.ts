import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingDetailModel } from '../_models/booking-details.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private bookingRoute: string = environment.baseApiUrl + '/trips';

    constructor(private http: HttpClient) {
    }

    bookRide(bookingRequest: any): Observable<boolean> {
        return this.http.post<boolean>(this.bookingRoute, bookingRequest);
    }

    cancelRide(bookingId: string): Observable<boolean> {
        return this.http.delete<boolean>(this.bookingRoute + '/' + bookingId);
    }

    viewPastRides(name: string): Observable<BookingDetailModel> {
        return this.http.get<BookingDetailModel>(this.bookingRoute + '/GetTripsByCustomer?name='+ name );
    }
}

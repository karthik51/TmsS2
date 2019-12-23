import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingDetailModel } from '../_models/booking-details.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private bookingRoute: string = environment.baseApiUrl + '/booking';

    constructor(private http: HttpClient) {
    }

    getAllBookings(): Observable<BookingDetailModel[]> {
        return this.http.get<BookingDetailModel[]>(this.bookingRoute);
    }
}

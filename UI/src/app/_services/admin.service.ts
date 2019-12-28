import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingDetailModel } from '../_models/booking-details.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private bookingRoute: string = environment.baseApiUrl + '/trips/GetAllTrips';

    constructor(private http: HttpClient) {
    }

    getAllBookings(): Observable<BookingDetailModel[]> {
        const token = sessionStorage.getItem('token');       
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
        const httpOptions = { 'headers': headers_object};
      
        var response = this.http.get<BookingDetailModel[]>(this.bookingRoute, httpOptions);
        console.log('service admin');
        return response;
    }
}

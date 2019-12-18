export interface BookingDetailModel {
    bookingDetailsId: number;
    bookingDate: Date;
    fromLocation: string;
    toLocation: string;
    bookedByUser: string;
    vehicleCategoryType: string;
    bookingAcceptedByUser: string;
    isBookingCancelled: boolean;
    isRideCompleted: boolean;
    vehicleImage: string;
    vehicleNumber: string;
}
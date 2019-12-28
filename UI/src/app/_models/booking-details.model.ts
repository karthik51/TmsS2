export interface BookingDetailModel {
    id: string;
    rideDate: Date;
    fromLocation: string;
    toLocation: string;
    rideByUser: string;
    vehicleCategoryType: string;
    rideAcceptedByUser: string;
    isRideCancelled: boolean;
    isRideCompleted: boolean;
    vehicleImage: string;
    vehicleNumber: string;
}


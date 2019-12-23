import { IVehicleCategoryModel } from './vehicle-cateogry.model';
import { IRegisterVehicleModel } from './register-vehicle.model';

export interface IRegisteredVehicleDetailsModel {
    isRegistered: boolean;
    vehicleCategories: IVehicleCategoryModel[];
    registeredVehicle: IRegisterVehicleModel;
}
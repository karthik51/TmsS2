import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { IRegisterVehicleModel } from 'src/app/_models/register-vehicle.model';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { IVehicleCategoryModel } from 'src/app/_models/vehicle-cateogry.model';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent implements OnInit {

  vehicleCategories: IVehicleCategoryModel[];
  vehicleImage: string;
  loggedInUserId: number;
  isRegistered: boolean;

  vehicleRegistration: IRegisterVehicleModel = {
    registeredByUserId: null,
    vehicleCategoryId: null,
    vehicleModel: null,
    vehicleNumber: null
  };

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loggedInUserId = this.authService.loggedInUserId;

    this.employeeService.getRegisterdVehicleDetails(this.loggedInUserId)
      .subscribe(details => {
        this.isRegistered = details.isRegistered;
        this.vehicleCategories = details.vehicleCategories;

        if (details.registeredVehicle) {
          this.vehicleRegistration = details.registeredVehicle;
        }

        this.onCategoryTypeChange(this.vehicleRegistration.vehicleCategoryId);
      });
  }

  registerVehicle(): void {
    this.vehicleRegistration.registeredByUserId = this.authService.loggedInUserId;

    if (this.isRegistered) {
      this.employeeService.updateRegistedVehicle(this.loggedInUserId, this.vehicleRegistration)
        .subscribe(response => {
          if (response) {
            this.alertify.success('Your vehicle registration has been updated successfully!');
          }
        });
    } else {
      this.employeeService.registerNewVehicle(this.vehicleRegistration)
        .subscribe(response => {
          if (response) {
            this.alertify.success('Your vehicle has been registered successfully!');
          }
        });
    }
  }

  onCategoryTypeChange(vehicleCategoryId: number): void {
    const vehicleCategory = this.vehicleCategories.find(category => category.vehicleCategoryId === vehicleCategoryId);
    this.vehicleImage = vehicleCategory ? vehicleCategory.vehicleImage : null;
  }
}

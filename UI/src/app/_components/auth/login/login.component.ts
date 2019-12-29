import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from './../../../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATH } from 'src/app/_constants/route-name.constant';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UnauthorizedError } from 'src/app/_shared/error-handlers/unauthorized-error';
import { CustomValidators } from 'src/app/_shared/custom.valiators';
import { BadRequestError } from './../../../_shared/error-handlers/bad-request-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isRegistration = false;
  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate([ROUTE_PATH.HOME]);
    }

    this.buildRegistrationForm();
  }

  buildRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, CustomValidators.passwordValidator]],
      confirmPassword: [null, Validators.required],
      role: [null, Validators.required]
    }, { validator: CustomValidators.confirmPasswordValidator });
  }

  get RegistrationFormControls() {
    return this.registrationForm.controls;
  }

  login(loginForm: any): void {
    this.authService.login(loginForm.value)
      .subscribe(response => {

      }, error => {
        if (error instanceof UnauthorizedError) {
          this.alertify.error("Incorrect Username or Password!");
        }
      }, () => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        //console.log(returnUrl);
        if (returnUrl) {
          returnUrl = returnUrl === ROUTE_PATH.LOGIN ? ROUTE_PATH.HOME : returnUrl;
        }      
      });
  }

  get UserRoute(): string {
    let userRoute: string;

    if (this.authService.isCustomerRole) {
      userRoute = ROUTE_PATH.CUSTOMER.MAIN + '/' + ROUTE_PATH.CUSTOMER.BOOK_A_RIDE;
    } else if (this.authService.isEmployeeRole) {
      userRoute = ROUTE_PATH.EMPLOYEE.MAIN + '/' + ROUTE_PATH.EMPLOYEE.VIEW_SUMMARY;
    } else {
      userRoute = ROUTE_PATH.HOME;
    }

    return userRoute;
  }

  registerUser(): void {
    this.authService.registerUser(this.registrationForm.value)
      .subscribe(() => {
        this.alertify.success('You have been registered successfully! Please Sign in.');
        this.registrationForm.reset();
        this.isRegistration = false;
      }, error => {
        if (error instanceof BadRequestError) {
          this.alertify.error(error.originalError);
        }
      });
  }
}

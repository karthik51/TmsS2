import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static passwordValidator(control: AbstractControl) : { [key: string]: boolean } | null {
        // Passwords will contain at least 1 upper case letter
        // Passwords will contain at least 1 lower case letter
        // Passwords will contain at least 1 number or special character
        // Passwords will contain at least 8 characters in length     
        // if (control.value  && control.value.match(/(?=^.{8,20}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
        if (control.value && control.value.match(/(?=^.{8,20}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            return null;
        } else {
            return { 'passwordComplexityFailed': true };
        }
    }

    static confirmPasswordValidator(control: AbstractControl) : { [key: string]: boolean } | null {
        const passsword = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if (!passsword || !confirmPassword) return null;
        return passsword.value === confirmPassword.value ? null : { 'confirmPasswordInvalid': true };
    }
}
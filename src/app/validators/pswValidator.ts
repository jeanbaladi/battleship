import { inject } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../views/auth/auth.service";

export function pswValidator(): ValidatorFn {
    const authService = inject(AuthService);
    
    return (control:AbstractControl) : ValidationErrors | null  => {

        const value = control.value;

        if (!value) {
            return {password: false, msg: Object.values(authService.pswRequirements)};
        }
        
        const res = authService.pswValidator(value);

        if(res == 'valid')
            return null;

        return {password: false, msg: res};
    }
}
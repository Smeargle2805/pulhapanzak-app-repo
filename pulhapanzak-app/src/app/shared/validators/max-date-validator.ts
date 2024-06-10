import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    if (selectedDate > maxDate) {
      return { invalidDate: true };
    }
    return null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    if (selectedDate > maxDate) {
      return { invalidDate: true };
    }
    return null;
  };
}

export function numericValidator(control: AbstractControl): ValidationErrors | null {
  const isNumeric = /^\d+$/.test(control.value);
  return !isNumeric ? { notNumeric: { value: control.value } } : null;
}

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length < minLength ? { minLength: { requiredLength: minLength, actualLength: control.value.length } } : null;
  };
}

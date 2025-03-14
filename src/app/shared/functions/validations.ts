import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function startWithUpperCase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validationResult: null | object = null;
    const value = <string>control.value;

    if (value && value.length > 0) {
      const firstLetter = value[0];

      if (firstLetter !== firstLetter.toUpperCase()) {
        validationResult = {
          'startWithUpperCase': {
            message: 'La primera letra debe ser mayúscula'
          }
        }
      }
    }

    return validationResult;
  }
}

export function dateBeforeToday(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validationResult: null | object = null;
    
    const entryDate: Date = new Date(control.value);
    const today: Date = new Date();

    if (entryDate > today) {
      validationResult = {
        dateBeforeToday: {
          message: 'La fecha no puede ser del futuro',
        }
      }
    }

    return validationResult;
  }
}
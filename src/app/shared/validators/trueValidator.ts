import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

// export function trueValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     return control.value ? null : { match: { value: control.value } };
//   };
// }

export function trueValidator(c: FormControl) {
  return !!c.value ? null : { validateTrue: { valid: false } };
}

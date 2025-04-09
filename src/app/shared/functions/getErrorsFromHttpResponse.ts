import { HttpErrorResponse } from "@angular/common/http";

export function extractErrors(errorResponse: HttpErrorResponse): string[] {
  const { errors } = errorResponse.error;
  const errorList: string[] = [];

  for (const errType in errors) {
    // Extract each errorArray for all types/values/fields that have at least one error
    let errorsFromType: string[] = errors[errType];

    // Mergin all errors with a new pattern "ErrorType: ErrorMessage"
    errorsFromType = errorsFromType.map(error => `${errType}: ${error}`);
    errorList.push(...errorsFromType);
  }

  return errorList;
}

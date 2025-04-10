import { HttpParams } from "@angular/common/http";

export function generateQueryParams(obj: Object): HttpParams {
  let queryParams: HttpParams = new HttpParams();

  for (const prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      queryParams = queryParams.append(prop, (obj as any)[prop]);
    }
  }

  return queryParams;
}
import { Observable } from "rxjs";
import { PaginationDTO } from "../models/PaginationDTO";
import { HttpResponse } from "@angular/common/http";

export interface ICRUDService<TDTO, TCreationDTO> {
  obtainAll(pagination: PaginationDTO): Observable<HttpResponse<TDTO[]>>;
  obtainById(id: number): Observable<TDTO>;
  create(entity: TCreationDTO): Observable<TDTO>;
  update(id: number, entity: TCreationDTO): Observable<TCreationDTO>;
  delete(id: number) : Observable<Object>;
}
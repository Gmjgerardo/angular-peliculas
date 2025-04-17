import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginationDTO } from '../../models/PaginationDTO';
import { HttpResponse } from '@angular/common/http';
import { GenericListComponent } from "../generic-list/generic-list.component";
import { RouterLink } from '@angular/router';
import { capitalizeString } from '../../../shared/functions';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { ICRUDService } from '../../interfaces/ICRUDService';

@Component({
  selector: 'app-entity-index',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, SweetAlert2Module, GenericListComponent, RouterLink,],
  templateUrl: './entity-index.component.html',
  styleUrl: './entity-index.component.css'
})
export class EntityIndexComponent<TDTO, TCreationDTO> implements OnInit {
  private CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;

  @Input({ required: true }) title: string = '';
  @Input({ required: true }) editURL: string = '';
  @Input() columnsToDisplay: string[] = ['id', 'name', 'actions'];

  entities!: TDTO[];
  totalRecords!: number;

  pagination: PaginationDTO = { page: 1, rowsPerPage: 5 };
  swalConfigs: Object = {
    titleText: 'Confirmación',
    text: '¿Deseas borrar este registro?',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
  };

  private getRows(): void {
    this.CRUDService.obtainAll(this.pagination).subscribe((response: HttpResponse<TDTO[]>) => {
      const { headers, body } = response;
      this.entities = body as TDTO[];
      this.totalRecords = Number(headers.get('total-records-count'));
    });
  }

  capitalize = (txt: string): string => capitalizeString(txt);

  ngOnInit(): void {
    this.getRows();
  }

  updateTable(pagination: PageEvent) {
    const { pageIndex: page, pageSize: rowsPerPage } = pagination;
    this.pagination = {page: page + 1, rowsPerPage};
    this.getRows();
  }

  deleteRow(id: number): void {
    this.CRUDService.delete(id).subscribe(() => {
      this.pagination.page = 1;
      this.getRows();
    });
  }
}

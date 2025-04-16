import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActorsService } from '../actors.service';
import { ActorDTO } from '../actors';
import { HttpResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-index-actors',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, MatButtonModule, GenericListComponent, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './index-actors.component.html',
  styleUrl: './index-actors.component.css'
})
export class IndexActorsComponent implements OnInit {
  private actorsService: ActorsService = inject(ActorsService);

  actors: ActorDTO[] = [];
  columnsToDisplay: string[] = ['id', 'name', 'actions'];
  pagination: PaginationDTO = { page: 1, rowsPerPage: 5 };
  totalRecords!: number;
  swalConfigs: Object = {
    titleText: 'Confirmación',
    text: '¿Deseas borrar este registro?',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
  };

  private getRows(): void {
    this.actorsService.obtainAll(this.pagination).subscribe((response: HttpResponse<ActorDTO[]>) => {
      const { headers, body } = response;
      this.actors = body as ActorDTO[];
      this.totalRecords = Number(headers.get('total-records-count'));
    });
  }
  ngOnInit(): void {
    this.getRows();
  }

  updateTable(pagination: PageEvent) {
    const { pageIndex: page, pageSize: rowsPerPage } = pagination;
    this.pagination = {page: page + 1, rowsPerPage};
    this.getRows();
    }

  deleteRow(id: number): void {
    this.actorsService.delete(id).subscribe(() => {
      this.pagination = { page: 1, rowsPerPage: 5 };
      this.getRows();
    });
  }
}

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenresService } from '../genres.service';
import { GenreDTO } from '../genres';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { PaginationDTO } from '../../shared/models/PaginationDTO';

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [MatButtonModule, RouterLink, GenericListComponent, MatTableModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css'
})
export class IndexGenresComponent {
  genresService: GenresService = inject(GenresService);
  genres!: GenreDTO[];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  pagination: PaginationDTO = { page: 1, rowsPerPage: 5 };
  rowsCount!: number;

  constructor() {
    this.getRows();
  }

  getRows(): void {
    this.genresService.obtainAll(this.pagination)
    .subscribe((response: HttpResponse<GenreDTO[]>) => {
      const {headers, body} = response;

      this.genres = body as GenreDTO[];
      this.rowsCount = Number(headers.get('total-records-count'));
    });
  }

  updateTable(pag: PageEvent): void {
    this.pagination = { page: pag.pageIndex + 1, rowsPerPage: pag.pageSize };
    this.getRows();
  }
}

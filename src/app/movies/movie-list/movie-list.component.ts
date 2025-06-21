import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MoviesService } from '../movies.service';
import { AuthorizedComponent } from "../../security/authorized/authorized.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgOptimizedImage, GenericListComponent, MatButtonModule, MatIconModule, RouterLink, SweetAlert2Module, AuthorizedComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private movieService:  MoviesService = inject(MoviesService);

  @Input({ required: true })
  movies!: any[];

  @Output() onMovieDeleted = new EventEmitter<void>();

  swalConfigs: Object = {
    titleText: 'Confirmación',
    text: '¿Deseas borrar esta película?',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
  };

  delete(id: number): void {
    this.movieService.delete(id).subscribe(() => this.onMovieDeleted.emit());
  }
}

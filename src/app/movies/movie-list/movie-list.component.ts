import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgOptimizedImage, GenericListComponent, MatButtonModule, MatIconModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  @Input({ required: true })
  movies!: any[];
}

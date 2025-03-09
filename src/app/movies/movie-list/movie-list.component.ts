import { CurrencyPipe, DatePipe, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, CurrencyPipe, NgOptimizedImage],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  @Input({ required: true })
  movies!: any[];
}

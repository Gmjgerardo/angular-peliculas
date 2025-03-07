import { Component } from '@angular/core';
import { MovieListComponent } from "./movies/movie-list/movie-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}

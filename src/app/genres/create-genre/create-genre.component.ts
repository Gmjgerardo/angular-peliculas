import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css'
})
export class CreateGenreComponent {
  router: Router = inject(Router);

  saveChanges(): void {
    this.router.navigate(['/generos']);
  }
}

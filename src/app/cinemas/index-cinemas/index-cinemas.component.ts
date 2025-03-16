import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-cinemas',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './index-cinemas.component.html',
  styleUrl: './index-cinemas.component.css'
})
export class IndexCinemasComponent {

}

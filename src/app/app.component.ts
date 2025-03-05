import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  movies = [
    {
      title: 'Star Wars, Episode III: Revenge Of The Sith',
      releaseDate: new Date('2005-05-19'),
      price: 300.99
    },
    {
      title: 'Avengers: Endgame',
      releaseDate: new Date('2019-04-26'),
      price: 500.99
    },
  ];
}

import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  @Input({ required: true, transform: (value: number) => Array(value).fill(0) })
  maximumRating!: number[];

  @Input()
  selectedRating = 0;

  previousSelectedRating = 0;

  @Output()
  voted = new EventEmitter<number>();

  manageMouseEnter(index: number): void {
    this.selectedRating = index + 1;
  }

  manageMouseLeave(): void {
    this.selectedRating = this.previousSelectedRating || 0;
  }

  manageClick(index: number): void {
    this.selectedRating = index + 1;
    this.previousSelectedRating = this.selectedRating;
    this.voted.emit(this.selectedRating);
  }
}

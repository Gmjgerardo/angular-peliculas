import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit {
  @Input({ required: true })
  maximumRating!: number;

  @Input()
  selectedRating = 0;

  previousSelectedRating = 0;
  maximumRatingArray: any[] = [];

  ngOnInit(): void {
    this.maximumRatingArray = Array(this.maximumRating).fill(0);
  }

  manageMouseEnter(index: number): void {
    this.selectedRating = index + 1;
  }

  manageMouseLeave(): void {
    this.selectedRating = this.previousSelectedRating || 0;
  }

  manageClick(index: number): void {
    this.selectedRating = index + 1;
    this.previousSelectedRating = this.selectedRating;
  }
}

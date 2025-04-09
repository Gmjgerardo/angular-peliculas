import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './error-list.component.html',
  styleUrl: './error-list.component.css'
})
export class ErrorListComponent implements OnChanges {
  @Input({ required: true }) errors!: string[];

  close() {
    this.errors.splice(0);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if(changes['errors'] && this.errors.length > 0) {
      await setTimeout(() => this.close(), 5000);
    }
  }
}

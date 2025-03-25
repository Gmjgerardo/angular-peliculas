import { Component, Input } from '@angular/core';
import { MultipleSelectorDTO } from './MultipleSelectorModel';

@Component({
  selector: 'app-multiple-selector',
  standalone: true,
  imports: [],
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.css'
})
export class MultipleSelectorComponent {
  @Input({ required: true, }) selected!: MultipleSelectorDTO[];

  @Input({ required: true, }) notSelected!: MultipleSelectorDTO[];

  select(element: MultipleSelectorDTO, index: number): void {
    this.selected.push(element);
    this.notSelected.splice(index, 1);
  }

  unselect(element: MultipleSelectorDTO, index: number): void {
    this.notSelected.push(element);
    this.selected.splice(index, 1);
  }

  selectAll(): void {
    this.selected.push(...this.notSelected);
    this.notSelected.length = 0; // If sets [] the references changes and the arrays from components are different
  }

  unselectAll(): void {
    this.notSelected.push(...this.selected);
    this.selected.length = 0; // If sets [] the references changes and the arrays from components are different
  }
}

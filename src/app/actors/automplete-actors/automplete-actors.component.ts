import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorAutocompleteDTO } from '../actors';

@Component({
  selector: 'app-automplete-actors',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatTableModule, MatIconModule,
    DragDropModule,
  ],
  templateUrl: './automplete-actors.component.html',
  styleUrl: './automplete-actors.component.css'
})
export class AutompleteActorsComponent {
  @ViewChild(MatTable) table !: MatTable<ActorAutocompleteDTO>;

  control: FormControl = new FormControl();

  actors: ActorAutocompleteDTO[] = [
    {id: 1, name: 'Natalie Portman', character: '', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Natalie_Portman_2023.jpg/220px-Natalie_Portman_2023.jpg'},
    {id: 2, name: 'Hayden Christensen', character: '', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hayden-cfda2010-0004%281%29_%28cropped%29.jpg/220px-Hayden-cfda2010-0004%281%29_%28cropped%29.jpg'},
    {id: 3, name: 'Ewan McGregor', character: '', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/EwanMcGregor2023.jpg/220px-EwanMcGregor2023.jpg'},
    {id: 4, name: 'Chris Hemsworth', character: '', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg/250px-Chris_Hemsworth_by_Gage_Skidmore_3.jpg'},
    {id: 5, name: 'Scarlett Johansson', character: '', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Goldene_Kamera_2012_-_Scarlett_Johansson_5_%28cropped%29.jpg/250px-Goldene_Kamera_2012_-_Scarlett_Johansson_5_%28cropped%29.jpg'},
    {id: 6, name: 'Tom Hiddleston', character: '', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tom_Hiddleston_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg/250px-Tom_Hiddleston_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg'},
  ];

  selectedActors: ActorAutocompleteDTO[] = [];

  displayedColumns: string[] = ['image', 'name', 'character', 'actions'];

  selectActor(event: MatAutocompleteSelectedEvent): void {
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');

    if(this.table) {
      this.table.renderRows();
    }
  }

  deleteFromSelected(actor: ActorAutocompleteDTO): void {
    const index: number = this.selectedActors.indexOf(actor);

    this.selectedActors.splice(index, 1);

    this.table.renderRows();
  }
  
  stopDragging(event: CdkDragDrop<any[]>): void {
    const previousIndex: number = this.selectedActors.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}

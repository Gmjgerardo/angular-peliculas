import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorAutocompleteDTO } from '../actors';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-automplete-actors',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatTableModule, MatIconModule,
    DragDropModule, AsyncPipe,
  ],
  templateUrl: './automplete-actors.component.html',
  styleUrl: './automplete-actors.component.css'
})
export class AutompleteActorsComponent implements OnInit {
  private actorService: ActorsService = inject(ActorsService);

  @ViewChild(MatTable) table !: MatTable<ActorAutocompleteDTO>;

  control: FormControl = new FormControl();
  filterOptions!: Observable<ActorAutocompleteDTO[]>;

  actors: ActorAutocompleteDTO[] = [];

  @Input({ required: true })
  selectedActors: ActorAutocompleteDTO[] = [];

  displayedColumns: string[] = ['image', 'name', 'character', 'actions'];

  ngOnInit(): void {
    // Obtaining all actors to show in the actors array
    this.actorService.getAll().subscribe(actors => this.actors = actors);

    // Adding filter function to use when name input changes
    this.filterOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value || '')),
    );
  }

  private _filter(name: string): ActorAutocompleteDTO[] {
    return this.actors.filter(actor => actor.name.toLowerCase().includes(name?.toLocaleLowerCase?.()));
  }

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

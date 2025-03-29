import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-automplete-actors',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './automplete-actors.component.html',
  styleUrl: './automplete-actors.component.css'
})
export class AutompleteActorsComponent {
  control: FormControl = new FormControl();
}

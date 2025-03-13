import { Component, EventEmitter, inject, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWithUpperCase } from '../../shared/functions/validations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GenreCreationDTO, GenreDTO } from '../genres';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.css'
})
export class GenreFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  model: GenreDTO | undefined;

  @Output()
  postSendEvent: EventEmitter<GenreCreationDTO> = new EventEmitter<GenreCreationDTO>();
  
  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required, startWithUpperCase()]}]
  });

  ngOnInit(): void {
    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  obtainErrorNameField(): string {
    const { name } = this.form.controls;
    let error: string = "";

    if (name.hasError('required'))
      error = "El campo nombre es requerido";
    if (name.hasError('startWithUpperCase'))
      error = name.getError('startWithUpperCase').message;

    return error;
  }

  saveChanges(): void {
    if (this.form.valid) {
      const genre = this.form.value as GenreCreationDTO;
      this.postSendEvent.emit(genre);
    }
  }
}

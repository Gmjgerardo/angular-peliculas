import { Component, EventEmitter, inject, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWithUpperCase } from '../../shared/functions/validations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GenreCreationDTO, GenreDTO } from '../genres';
import { IFormComponent } from '../../shared/interfaces/IFormComponent';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.css'
})
export class GenreFormComponent implements IFormComponent<GenreDTO, GenreCreationDTO>, OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  model: GenreDTO | undefined;

  @Output()
  postSendEvent: EventEmitter<GenreCreationDTO> = new EventEmitter<GenreCreationDTO>();
  
  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required, Validators.maxLength(50), startWithUpperCase()]}]
  });

  ngOnInit(): void {
    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  obtainErrorsNameField(): string[] {
    const { name } = this.form.controls;
    let errors: string[] = [];

    if (name.hasError('required'))
      errors.push("El campo nombre es requerido");
    if (name.hasError('maxlength'))
      errors.push(`El campo nombre debe tener ${name.getError('maxlength').requiredLength} caracteres o menos`);
    if (name.hasError('startWithUpperCase'))
      errors.push(name.getError('startWithUpperCase').message);

    return errors;
  }

  saveChanges(): void {
    if (this.form.valid) {
      const genre = this.form.value as GenreCreationDTO;
      this.postSendEvent.emit(genre);
    }
  }
}

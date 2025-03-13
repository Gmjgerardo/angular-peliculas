import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWithUpperCase } from '../../shared/functions/validations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.css'
})
export class GenreFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Output()
  postSendEvent: EventEmitter = new EventEmitter<>();
  
  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required, startWithUpperCase()]}]
  });

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
    console.log(this.form.value);
  }
}

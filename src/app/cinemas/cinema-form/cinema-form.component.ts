import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CinemaCreateDTO, CinemaDTO } from '../cinemas';

@Component({
  selector: 'app-cinema-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.css'
})
export class CinemaFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  
  form: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', {
      validators: [Validators.required]
    }),
  });

  @Input()
  model: CinemaDTO | undefined;

  @Output()
  postSendEvent: EventEmitter<CinemaCreateDTO> = new EventEmitter<CinemaCreateDTO>();

  ngOnInit(): void {
    this.model && this.form.patchValue(this.model);
  }

  obtainErrorsNameField(): string {
    const { name: nameField }  = this.form.controls;
    let errorMessage: string = "";

    if (nameField.hasError('required'))
      errorMessage = "El campo nombre es requerido";

    return errorMessage;
  }

  saveChanges(): void {
    if (this.form.valid) {
      const cinema: CinemaCreateDTO = this.form.value as CinemaCreateDTO;
      this.postSendEvent.emit(cinema);
    }
  }
}

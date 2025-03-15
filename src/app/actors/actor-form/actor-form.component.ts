import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { ActorCreateDTO, ActorDTO } from '../actors';
import { dateBeforeToday } from '../../shared/functions/validations';
import { InputImgComponent } from "../../shared/components/input-img/input-img.component";

@Component({
  selector: 'app-actor-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, RouterLink, InputImgComponent],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  model: ActorDTO | undefined;

  @Output()
  postSendEvent: EventEmitter<ActorCreateDTO> = new EventEmitter<ActorCreateDTO>();

  form: FormGroup = this.formBuilder.group({
    name: new FormControl('', { validators: [Validators.required] }),
    birthDate: new FormControl<Date | null>(null, {
      validators: [Validators.required, dateBeforeToday()]
    }),
    profileImage: new FormControl<File | string | null>(null, {
      validators: []
    }),
  });

  ngOnInit(): void {
    if (this.model)
      this.form.patchValue(this.model);
  }

  saveChanges(): void {
    if (this.form.valid) {
      const actor = this.form.value as ActorCreateDTO;
      // Reset profileImage value in cases where the image is the same
      typeof actor.profileImage === "string" && (actor.profileImage = undefined);
      this.postSendEvent.emit(actor);
    }
  }

  handleImageChange(imageFile: File): void {
    this.form.controls['profileImage'].setValue(imageFile);
  }

  obtainErrorsNameField(): string {
    let errorMessage: string = "";
    const nameField = this.form.controls['name'];

    if (nameField.hasError('required'))
      errorMessage = "El campo nombre es requerido";

    return errorMessage;
  }

  obtainErrorsBirthdateField(): string {
    let errorMessage: string = "";
    const birthDateField = this.form.controls['birthDate'];

    if (birthDateField.hasError('required'))
      errorMessage = "El campo fecha de nacimiento es requerido";
    if (birthDateField.hasError('dateBeforeToday'))
      errorMessage = birthDateField.getError('dateBeforeToday').message;

    return errorMessage;
  }
}
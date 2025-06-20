import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentialsDTO } from '../security';
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authetication-form',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorListComponent, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './authetication-form.component.html',
  styleUrl: './authetication-form.component.css',
})
export class AutheticationFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input({ required: true }) title!: string;
  @Input() errors: string[] = [];

  @Output() onSubmit: EventEmitter<UserCredentialsDTO> = new EventEmitter<UserCredentialsDTO>();

  form: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = this.formBuilder.group({
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { validators: [Validators.required] }),
  });

  obtainInputErrors(control: FormControl): string {
    let errorMessage: string = '';
    
    if (control.hasError('required'))
      errorMessage = 'El campo es requerido';
    if (control.hasError('email'))
      errorMessage = 'El email es invalido';

    return errorMessage;
  }

  submitForm(): void {
    if (this.form.valid)
      this.onSubmit.emit(this.form.value as UserCredentialsDTO);
  }
}

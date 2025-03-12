import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css'
})
export class CreateGenreComponent {
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required]}]
  });

  obtainErrorNameField(): string {
    const { name } = this.form.controls;
    let error: string = "";

    if (name.hasError('required')) {
      error = "El campo nombre es requerido";
    }

    return error;
  }

  saveChanges(): void {
    // this.router.navigate(['/generos']);
    console.log(this.form.value);
  }
}

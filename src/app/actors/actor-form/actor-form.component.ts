import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActorCreateDTO, ActorDTO } from '../actors';

@Component({
  selector: 'app-actor-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, RouterLink],
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
    birthDate: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    if (this.model)
      this.form.patchValue(this.model);
  }

  saveChanges(): void {
    if (this.form.valid) {
      const actor = this.form.value as ActorCreateDTO;
      this.postSendEvent.emit(actor);
    }
  }
}

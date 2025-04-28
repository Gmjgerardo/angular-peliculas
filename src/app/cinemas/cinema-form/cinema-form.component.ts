import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CinemaCreateDTO, CinemaDTO } from '../cinemas';
import { MapComponent } from "../../shared/components/map/map.component";
import { Coordinate } from '../../shared/components/map/Coordinates';

@Component({
  selector: 'app-cinema-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink, MapComponent],
  templateUrl: './cinema-form.component.html',
  styleUrl: './cinema-form.component.css'
})
export class CinemaFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  initialCoordinates: Coordinate[] = [];
  
  form: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', {
      validators: [Validators.required]
    }),
    coordinates: new FormControl<Coordinate | null>(null, [Validators.required]),
  });

  @Input()
  model: CinemaDTO | undefined;

  @Output()
  postSendEvent: EventEmitter<CinemaCreateDTO> = new EventEmitter<CinemaCreateDTO>();

  ngOnInit(): void {
    if (this.model) {
      const { latitude: lat, longitude: lng } = this.model;
      let model = {...this.model, coordinates: {lat, lng}}

      this.initialCoordinates.push({ lat, lng } as Coordinate);
      this.form.patchValue(model);
    } 
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
      const {lat: latitude, lng: longitude} = this.form.value.coordinates as Coordinate;
      const cinema: CinemaCreateDTO = {...this.form.value, latitude, longitude} as CinemaCreateDTO;
      this.postSendEvent.emit(cinema);
    }
  }

  changeCinemaLocation(coordinates: Coordinate): void {
    this.form.controls['coordinates'].setValue(coordinates);
  }
}

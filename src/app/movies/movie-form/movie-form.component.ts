import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputImgComponent } from '../../shared/components/input-img/input-img.component';
import { RouterLink } from '@angular/router';
import { MovieDTO, MovieCreateDTO } from '../movies';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { MultipleSelectorComponent } from "../../shared/components/multiple-selector/multiple-selector.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorModel';
import { AutompleteActorsComponent } from "../../actors/automplete-actors/automplete-actors.component";

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, MultipleSelectorComponent, AutompleteActorsComponent],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Output() onPostSendEvent: EventEmitter<MovieCreateDTO> = new EventEmitter<MovieCreateDTO>();

  @Input() model: MovieDTO | undefined;

  // Genres Selector Variables
  @Input({ required: true }) selectedGenres!: MultipleSelectorDTO[];
  @Input({ required: true }) notSelectedGenres!: MultipleSelectorDTO[];

  // Cinemas Selector Variables
  @Input({ required: true }) selectedCinemas!: MultipleSelectorDTO[];
  @Input({ required: true }) notSelectedCinemas!: MultipleSelectorDTO[];

  form: FormGroup<{
    title: FormControl<string | null>,
    releaseDate: FormControl<Date | null>,
    trailer: FormControl<string | null>,
    image: FormControl<string | File | null>,
  }> = this.formBuilder.group({
    title: new FormControl<string>('', [Validators.required,]),
    releaseDate: new FormControl<Date | null>(null, [Validators.required,]),
    trailer: new FormControl<string>(''),
    image: new FormControl<File | string | null>(null),
  });

  ngOnInit(): void {
    if (this.model) {
      this.form.patchValue(this.model);
    }
  }

  changeImage(file: File) {
    this.form.controls.image.setValue(file);
    }

  registerSubmit(): void {
    if (this.form.valid) {
      const movie: MovieCreateDTO = this.form.value as MovieCreateDTO;

      // Convert releaseDate (moment) to redeable date
      movie.releaseDate = moment(movie.releaseDate).toDate();

      // Adding selected data to movie object
      movie.genresIds = this.selectedGenres.map(genre => genre.key);
      movie.cinemasIds = this.selectedCinemas.map(movie => movie.key);

      this.onPostSendEvent.emit(movie);
    }
  }

  obtainErrorsTitleField(): string {
    let errorMessage: string = "";
    const { title: titleField} = this.form.controls;

    if (titleField.hasError('required'))
      errorMessage = "El campo título es requerido";

    return errorMessage;
  }

  obtainErrorsReleaseDateField(): string {
    let errorMessage: string = "";
    const { releaseDate: dateField} = this.form.controls;

    if (dateField.hasError('required'))
      errorMessage = "El campo fecha lanzamiento es requerido";

    return errorMessage;
  }
}

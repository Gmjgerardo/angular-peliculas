import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { MoviesService } from '../movies.service';
import { MovieDTO } from '../movies';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordinate } from '../../shared/components/map/Coordinates';
import { MapComponent } from "../../shared/components/map/map.component";
import { RouterLink } from '@angular/router';
import { RatingComponent } from "../../shared/components/rating/rating.component";
import { RatingsService } from '../../ratings/ratings.service';
import { SecurityService } from '../../security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-movie',
  standalone: true,
  imports: [LoadingComponent, MatChipsModule, MapComponent, RouterLink, RatingComponent],
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.css'
})
export class DetailMovieComponent implements OnInit {
  private movieService: MoviesService = inject(MoviesService);
  private ratingsService: RatingsService = inject(RatingsService);
  private securityService: SecurityService = inject(SecurityService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  @Input({ required: true, transform: numberAttribute }) id!: number;

  movie!: MovieDTO;
  trailerURL!: SafeResourceUrl | string;
  coordinates: Coordinate[] = [];

  ngOnInit(): void {
    this.movieService.obtainById(this.id).subscribe({
      next: (movie) => {
        movie.releaseDate = new Date(movie.releaseDate);
        this.movie = movie;

        // Creating Youtube embed url if the movie entity has a trailer url
        if (movie.trailer)
          this.trailerURL = this.getSafeYoutubeEmbedUrl(this.extractYoutubeVideoId(movie.trailer));

        this.coordinates = movie.cinemas!.map(({name, latitude: lat, longitude: lng}) => <Coordinate>{text: name, lat, lng});
      },
      error: (err) => console.error('An Error occurred when retrieve movie information process', err),
    });
  }

  extractYoutubeVideoId(fullUrl: string): string {
    let result: string = "";

    if (fullUrl) {
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/i;
      const match = fullUrl.match(regex);
      result = match && match[1] ? match[1] : "";
    }

    return result;
  }

  getSafeYoutubeEmbedUrl(url: string): SafeResourceUrl | string {
    const youtubeIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    let result: SafeResourceUrl | string = "";

    if (url && youtubeIdPattern.test(url)) {
      result = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${url}?rel=0`);
    }

    return result;
  }

  rate(value: number): void {
    if (this.securityService.isLogged())
      this.ratingsService
        .rateMovie({ movieId: this.movie.id, rate: value })
        .subscribe({
          next: () => Swal.fire('Exitoso', "Su voto ha sido recibido", 'success'),
          error: (err) => {
            console.error(err);
            Swal.fire('Error', "Ocurrio un error al intentar registrar el voto", 'error');
          },
        });
    else 
        Swal.fire('Error', "Debes estar logueado para poder votar por una película", 'error');
  }
}

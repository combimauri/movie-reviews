import { Injectable, Signal, signal } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  readonly #movies = signal<Movie[]>([
    {
      id: '1',
      name: 'The Shawshank Redemption',
      rating: 5,
    },
    {
      id: '2',
      name: 'The Godfather',
      rating: 5,
    },
    {
      id: '3',
      name: 'The Dark Knight',
      rating: 4,
    },
    {
      id: '4',
      name: 'Pulp Fiction',
      rating: 4,
    },
    {
      id: '5',
      name: 'Forrest Gump',
      rating: 3,
    },
    {
      id: '6',
      name: 'Fight Club',
      rating: 5,
    },
    {
      id: '7',
      name: 'Inception',
      rating: 4,
    },
    {
      id: '8',
      name: 'The Matrix',
      rating: 4,
    },
    {
      id: '9',
      name: 'Goodfellas',
      rating: 5,
    },
    {
      id: '10',
      name: 'The Lord of the Rings: The Return of the King',
      rating: 5,
    },
  ]);

  getMovies(): Signal<Movie[]> {
    return this.#movies.asReadonly();
  }

  updateMovieRating(movieId: string, newRating: 1 | 2 | 3 | 4 | 5): void {
    const movieIndex = this.#movies().findIndex((movie) => movie.id === movieId);

    if (movieIndex !== -1) {
      this.#movies()[movieIndex].rating = newRating;
    }
  }
}

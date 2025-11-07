import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieService } from '../core/services/movie.service';
import { StarRating } from '../shared/components/star-rating/star-rating';

@Component({
  selector: 'combi-movie-list',
  imports: [StarRating],
  template: `
    <div class="space-y-4">
      @for (movie of movies(); track movie.id) {
        <div
          class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
            {{ movie.name }}
          </h2>
          <combi-star-rating [(rating)]="movie.rating" />
        </div>
      } @empty {
        <p
          class="text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md"
        >
          No movies found.
        </p>
      }
    </div>
  `,
})
export class MovieList implements OnChanges {
  @Input({ required: true }) moviesFilter = '';

  readonly #movieService = inject(MovieService);

  protected readonly movies = this.#movieService.getMovies();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['moviesFilter']?.currentValue) {
      console.log(this.moviesFilter);
    }
  }
}

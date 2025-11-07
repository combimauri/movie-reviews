import { Component, computed, inject, input } from '@angular/core';
import { MovieService } from '../core/services/movie.service';
import { StarRating } from '../shared/components/star-rating/star-rating';

@Component({
  selector: 'combi-movie-list',
  imports: [StarRating],
  template: `
    <div class="space-y-4">
      @for (movie of filteredMovies(); track movie.id) {
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
export class MovieList {
  filter = input.required({
    transform: (value: string) => value.toLowerCase(),
    alias: 'moviesFilter',
  });

  readonly #movieService = inject(MovieService);
  readonly #movies = this.#movieService.getMovies();

  protected filteredMovies = computed(() =>
    this.#movies().filter((movie) => movie.name.toLowerCase().includes(this.filter())),
  );
}

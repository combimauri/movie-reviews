import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from './core/services/movie.service';
import { Movie } from './core/models/movie.model';

@Component({
  selector: 'combi-root',
  imports: [FormsModule],
  template: `
    <div class="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans">
      <main class="container mx-auto p-4">
        <header class="text-center my-8">
          <h1 class="text-4xl font-bold text-slate-800 dark:text-slate-200">Movie Reviews</h1>
        </header>

        <div class="max-w-2xl mx-auto">
          <!-- Searchbox -->
          <div class="mb-6">
            <input
              type="text"
              placeholder="Search for a movie..."
              class="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              [(ngModel)]="moviesFilter"
            />
          </div>

          <!-- Movie List -->
          <div class="space-y-4">
            @for (movie of movies(); track movie.id) {
              <div
                class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {{ movie.name }}
                </h2>
                <div class="flex items-center">
                  @for (star of [1, 2, 3, 4, 5]; track star) {
                    <button (click)="updateRating(movie, star)" class="cursor-pointer">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        class="w-6 h-6 transition-colors duration-200"
                        [class.text-yellow-400]="star <= movie.rating"
                        [class.text-slate-300]="star > movie.rating"
                        [class.dark:text-slate-600]="star > movie.rating"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </button>
                  }
                </div>
              </div>
            } @empty {
              <p
                class="text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md"
              >
                No movies found.
              </p>
            }
          </div>
        </div>
      </main>
    </div>
  `,
})
export class App {
  readonly #movieService = inject(MovieService);

  protected readonly movies = this.#movieService.getMovies();

  protected moviesFilter = '';

  protected updateRating(movie: Movie, newRating: number): void {
    if (newRating < 1 || newRating > 5) {
      return;
    }

    this.#movieService.updateMovieRating(movie.id, newRating as 1 | 2 | 3 | 4 | 5);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieList } from './movie-list/movie-list';

@Component({
  selector: 'combi-root',
  imports: [FormsModule, MovieList],
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

          <combi-movie-list [moviesFilter]="moviesFilter" />
        </div>
      </main>
    </div>
  `,
})
export class App {
  protected moviesFilter = '';
}

import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/models/game.interface';
import { Category } from 'src/app/models/game.interface';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService implements OnDestroy {
  private loader = inject(LoaderService);
  private http = inject(HttpClient);

  private STORAGE_KEY = 'selectedGame';

  selectGame = signal<Game | null>(this.loadGame());  // Signal para el juego seleccionado
  genreGame = signal<Game[]>([]);  // Signal para los juegos filtrados por género
  categories = signal<Category[]>([]);  // Signal para las categorías disponibles
  allGames = signal<Game[]>([]);  // Signal para todos los juegos
  latestReleases = signal<Game[]>([]);  // Últimos lanzamientos usando signal
  seleteAll = signal<Boolean>(false);

  constructor() { }

  ngOnDestroy(): void {
  }

  setSelectedGame(game: Game) {
    this.selectGame.set(game);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(game)); // Guarda en localStorage
  }

  private loadGame(): Game | null {
    const storedGame = localStorage.getItem(this.STORAGE_KEY);
    return storedGame ? JSON.parse(storedGame) : null;
  }

  clearSelectedGame() {
    this.selectGame.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Método para obtener todos los juegos
  getGames(): void {
    this.loader.showLoader();

    this.http.get<Game[]>('/api/games').subscribe((games) => {
      console.log(games);

      this.allGames.set(games);  // Actualizamos el signal con todos los juegos
      this.processGames(games);  // Procesamos los juegos más recientes
      this.getLatestReleases(games);
    });

    this.loader.hideLoader();
  }

  // Procesamos los juegos y actualizamos las categorías
  processGames(games: Game[]): void {
    this.getCategories(games);  // Actualizamos las categorías
  }

  // Método para obtener los juegos más recientes
  getLatestReleases(games: Game[]) {
    const lastGames = games
      .map((game) => {
        if (game?.release_date) {
          game.release_date = new Date(game.release_date);
        }
        return game;
      })
      .sort((a, b) => b.release_date.getTime() - a.release_date.getTime());

    this.latestReleases.set(lastGames);
  }

  // Obtener categorías únicas y actualizar el signal de categorías
  getCategories(games: Game[]): void {
    const genres = games
      .map((game) => game?.genre)
      .filter((genre) => genre !== undefined && genre !== null);

    const uniqueCategories = [...new Set(genres)].map((genre) => ({ name: genre } as Category));
    this.categories.set(uniqueCategories);
  }

  // Filtramos los juegos por género y actualizamos el signal genderGame
  getGenreGames(genre: string): void {


    const games = this.allGames();  // Obtenemos todos los juegos desde el signal allGames
    const filteredGames = games.filter((game) => game?.genre === genre);
    if (genre != 'all') {
      this.genreGame.set(filteredGames);  // Actualizando el signal con los juegos filtrados
      this.seleteAll.set(false);
    } else {
      this.genreGame.set(this.allGames());  // Actualizamdo el signal con los juegos filtrados
      this.seleteAll.set(true);
    }
  }
}

import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { GamesService } from '../services/games/games.service';
import { Game } from 'src/app/models/game.interface'; // Asegúrate de importar las interfaces
import { Category } from 'src/app/models/game.interface'; // Si usas categorías
import { CommonModule } from '@angular/common';
import { CardGameComponent } from 'src/app/components/card-game/card-game/card-game.component';
import { signal } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonToolbar, IonContent, CommonModule, CardGameComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  protected gameService = inject(GamesService);
  private loader = inject(LoaderService);
  private router = inject(Router);

  windowWidth: number = window.innerWidth;

  swiperVisible = signal(false);

  constructor() { }

  ngOnInit(): void {
    this.loader.showLoader();
    this.updateSwiperConfig();
    window.addEventListener('resize', () => this.updateSwiperConfig());
    this.gameService.getGames();
    this.loader.hideLoader();
  }

  updateSwiperConfig() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth >= 700) {
      this.swiperVisible.set(true)
    } else {
      this.swiperVisible.set(false)
    }
  }



  saveGame(game: Game) {
    // Guardar el juego seleccionado y redirigir a la página de detalles
    this.gameService.setSelectedGame(game);
    this.router.navigate(['/tabs/game-page']);
  }

  redirectGenre(category: string) {

    this.gameService.getGenreGames(category)
    this.router.navigate(['/tabs/section-genre-game']);

  }
}

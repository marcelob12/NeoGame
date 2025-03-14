import { Component, inject, OnInit } from '@angular/core';
import { CardGameComponent } from '../card-game/card-game/card-game.component';
import { CommonModule } from '@angular/common';
import { GamesService } from 'src/app/pages/services/games/games.service';
import { Game } from 'src/app/models/game.interface';
import { IonContent, IonButton } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-section-genre-game',
  templateUrl: './section-genre-game.component.html',
  styleUrls: ['./section-genre-game.component.scss'],
  imports: [IonContent, CardGameComponent, CommonModule, FormsModule]
})
export class SectionGenreGameComponent implements OnInit {
  protected gameService = inject(GamesService);
  private router = inject(Router);
  selectedCategory: string = '';  // Categoría seleccionada
  categories: string[] = []; // Lista de categorías

  constructor() { }

  ngOnInit() {
    if (this.gameService.allGames().length === 0) {
      this.router.navigate(['tabs/home']);
      return;
    }
    this.loadCategories();
  }


  // Obtener todas las categorías disponibles
  loadCategories() {
    const allGames = this.gameService.allGames();
    this.categories = Array.from(new Set(allGames.map(game => game.genre)));
  }

  // Filtrar juegos según la categoría seleccionada
  filteredGames() {
    return this.gameService.genreGame();
  }

  // Método para cambiar la categoría seleccionada
  onCategoryChange() {
    this.gameService.getGenreGames(this.selectedCategory);
  }

  saveGame(game: Game) {
    this.gameService.selectGame.set(game);
    this.router.navigate(['/tabs/game-page']);
  }
}

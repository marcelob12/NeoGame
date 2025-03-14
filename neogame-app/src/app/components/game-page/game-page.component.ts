import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.interface';
import { IonContent, IonIcon, ModalController, IonRouterOutlet } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { CardGameComponent } from '../card-game/card-game/card-game.component';
import { GamesService } from 'src/app/pages/services/games/games.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/pages/services/cart/cart.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';


@Component({
  standalone: true,
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  imports: [IonContent, CommonModule, CardGameComponent]
})
export class GamePageComponent implements OnInit, OnDestroy {
  protected gameService = inject(GamesService)
  protected cartService = inject(CartService)
  private router = inject(Router)
  private routerOutlet = inject(IonRouterOutlet)
  private modalCtrl = inject(ModalController)
  game: Game | null = null;

  genreIcons: { [key: string]: string } = {
    'Shooter': 'Shooter.svg',
    'Battle Royale': 'Shooter.svg',
    'Action RPG': 'Action RPG.svg',
    'ARPG': 'Action RPG.svg',
    'MMOARPG': 'MMOARPG.svg',
    'MMORPG': 'MMOARPG.svg',
    'MOBA': 'MMOARPG.svg',
    'Fighting': 'Fighting.svg',
    'Card Game': 'Card Game.svg',
    'Strategy': 'Strategy.svg',
  };
  genreGame: Game[] = []

  constructor() { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.loadGame();

    //  Detecta cambios de tab (cuando el usuario regresa a este tab)
    //  solventando el problema que al presionar el tab no refrescaba la data
    this.routerOutlet.activateEvents.subscribe(() => {
      this.loadGame();
    });


  }

  private loadGame() {
    this.game = this.gameService.selectGame();
    if (this.game) {
      this.gameService.getGenreGames(this.game.genre);
      this.genreGame = this.gameService.genreGame()
    }
  }

  saveGame(game: Game) {
    this.gameService.setSelectedGame(game);
    this.loadGame()
  }

  async addToCart(game: Game) {
    const modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      cssClass: 'modalNotificationModal',
      componentProps: {
        title: `¿Deseas agregar ${game.title} al carrito?`,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      if (game) {
        this.cartService.addGame(game)

      }
    }
  }



}

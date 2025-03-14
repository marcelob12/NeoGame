import { inject, Injectable, signal } from '@angular/core';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { Game } from 'src/app/models/game.interface';
import { CartGame } from 'src/app/models/game.interface';
import { ModalController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private modalCtrl = inject(ModalController)

  private STORAGE_KEY = 'cartGames';
  gamesInCart = signal<CartGame[]>(this.loadCart());

  constructor() { }

  private saveCart(games: CartGame[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(games));
  }

  private loadCart(): CartGame[] {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  async addGame(game: Game) {
    this.gamesInCart.update((currentGames) => {
      const gameIndex = currentGames.findIndex(g => g.id === game.id);

      if (gameIndex !== -1) {
        currentGames[gameIndex] = {
          ...currentGames[gameIndex],
          quantity: (currentGames[gameIndex].quantity || 1) + 1
        };
      } else {
        currentGames.push({ ...game, quantity: 1 });
      }

      this.saveCart(currentGames);
      return [...currentGames];
    });
  }

  increaseQuantity(game: Game) {
    this.gamesInCart.update((currentGames) => {
      const updatedGames = currentGames.map(g =>
        g.id === game.id ? { ...g, quantity: g.quantity + 1 } : g
      );

      this.saveCart(updatedGames);
      return updatedGames;
    });
  }


  async decreaseQuantity(game: Game) {
    const modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      cssClass: 'modalNotificationModal',
      componentProps: {
        title: `¿Estás seguro de eliminar ${game.title} del carrito?`,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == 'confirm') {

      this.gamesInCart.update((currentGames) => {
        const updatedGames = currentGames
          .map(g => g.id === game.id ? { ...g, quantity: g.quantity - 1 } : g)
          .filter(g => g.quantity > 0);

        this.saveCart(updatedGames);
        return updatedGames;
      });
    }
  }

  async clearCart() {

    const modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      cssClass: 'modalNotificationModal',
      componentProps: {
        title: `¿Estás seguro de eliminar el carrito?`,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == 'confirm') {
      this.gamesInCart.set([]); // Vaciar el carrito
      localStorage.removeItem(this.STORAGE_KEY); // Borrar de localStorage
    }
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.page').then(m => m.CartPage),
      },
      {
        path: 'game-page',
        loadComponent: () => import('./components/game-page/game-page.component').then(m => m.GamePageComponent),
      },
      {
        path: 'section-genre-game',
        loadComponent: () => import('./components/section-genre-game/section-genre-game.component').then(m => m.SectionGenreGameComponent),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

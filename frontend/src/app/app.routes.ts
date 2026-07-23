import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./components/game-list/game-list').then(
        component => component.GameList,
      ),
  },

  {
    path: 'games/:id',
    loadComponent: () =>
      import('./components/game-details/game-details').then(
        component => component.GameDetails,
      ),
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart').then(
        component => component.Cart,
      ),
  },


  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound').then(
        component => component.NotFound,
      ),
  },
];

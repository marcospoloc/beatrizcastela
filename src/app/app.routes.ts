import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: ()=>import('./components/web/home/home.component')
    .then( m => m.HomeComponent)
  },
  {
    path: ':id',
    loadComponent: ()=>import('./components/web/dynamic-page/dynamic-page.component')
    .then( m => m.DynamicPageComponent)
  },
  {
    path: ' ', redirectTo: '',
    pathMatch: 'full' }, // Ruta de redirección para la URL vacía
  { path: '**',
    loadComponent: ()=>import('./components/web/home/home.component')
    .then( m => m.HomeComponent)
  },
];

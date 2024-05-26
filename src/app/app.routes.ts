import { Routes } from '@angular/router';
import { PageNotFound } from '@src/app/error/PageNotFound.component.ts';
import { AppHome } from '@src/app/home/Home.component.ts';

export const routes: Routes = [
  { path: 'home', component: AppHome },
  { path: '', component: AppHome },
  { path: '**', component: PageNotFound }
];

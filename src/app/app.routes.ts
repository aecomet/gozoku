import { Routes } from '@angular/router';
import { PageNotFound } from '@src/app/error/PageNotFound.component.ts';
import { AppHome } from '@src/app/home/Home.component.ts';
import { AppSchedule } from '@src/app/schedule/Schedule.component.ts';

export const routes: Routes = [
  { path: '', component: AppHome },
  { path: 'schedule', component: AppSchedule },
  { path: '**', component: PageNotFound }
];

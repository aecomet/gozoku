import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  imports: [MatCardModule]
})
export class AppHome {}

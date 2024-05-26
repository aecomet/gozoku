import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './Toolbar.component.html',
  styleUrl: './Toolbar.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class AppToolbar {}

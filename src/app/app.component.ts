import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppToolbar } from '@src/app/layouts/Toolbar.component.ts';
import { Link } from '@src/types/RouterLink.ts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, AppToolbar, MatTabsModule, RouterLink, RouterLinkActive, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  links: Link[] = [
    {
      label: 'Home',
      path: '/'
    },
    { label: '日程', path: '/schedule' }
  ];
  activeLink: string = this.links[0].label;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navClick(link: Link): void {
    this.activeLink = link.label;
    this.router.navigateByUrl(link.path);
  }

  isActiveLink(link: Link): boolean {
    return this.activeLink === link.label;
  }
}

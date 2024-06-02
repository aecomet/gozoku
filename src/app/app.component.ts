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
  styleUrl: './app.component.scss'
})
export class AppComponent {
  links: Link[] = [
    {
      label: 'Home',
      path: '/gozoku'
    },
    { label: '開催履歴', path: '/gozoku/schedule' },
    { label: '遺産', path: '/gozoku/library' }
  ];
  activeLink: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const activePath = this.links.find((link) => link.path === location.pathname);
    this.activeLink = activePath === undefined ? this.links[0].label : activePath.label;

    this.router.navigateByUrl(location.pathname);
  }

  navClick(link: Link): void {
    this.activeLink = link.label;
    this.router.navigateByUrl(link.path);
  }

  isActiveLink(link: Link): boolean {
    return this.activeLink === link.label;
  }
}

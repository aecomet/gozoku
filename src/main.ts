import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@src/app/app.component.ts';
import { appConfig } from '@src/app/app.config.ts';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

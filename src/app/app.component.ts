import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicPageComponent } from './components/web/dynamic-page/dynamic-page.component';
import { NavbarComponent } from './components/web/navbar/navbar.component';
import { FooterComponent } from './components/web/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DynamicPageComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beatrizcastela';
}

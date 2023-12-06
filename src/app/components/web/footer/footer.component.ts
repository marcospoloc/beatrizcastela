import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class  FooterComponent {

  imageArray = [
    {
      url: 'assets/images/logo/facebook-logo.svg',
      link: 'https://www.facebook.com/beatrizcastelaartista' },
    {
      url: 'assets/images/logo/twitter-logo.svg',
      link: 'https://twitter.com/beatrizcastela'
    },
    {
      url: 'assets/images/logo/instagram-logo.svg',
      link: 'https://www.instagram.com/beatriz.castela/'
    },
  ];

}


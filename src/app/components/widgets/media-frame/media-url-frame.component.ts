import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInterface } from '@dataModul/data';
import { MediaFrameComponent } from './media-frame.component';
import { LoadingComponent } from '../../web/shared/loading/loading.component';

@Component({
  selector: 'app-media-url-frame',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  template: `
  @defer (on viewport) {
    <div class="youtube">
      <iframe src="https://www.youtube.com/embed/DP6GETMaeuU" allowfullscreen></iframe> />
    </div>
    }@placeholder {
      <app-loading/>
    }@loading (){
      <app-loading/>
    }
  `,
})
export class MediaUrlFrameComponent extends MediaFrameComponent{
  @Input()activarVideo: boolean = false;
}

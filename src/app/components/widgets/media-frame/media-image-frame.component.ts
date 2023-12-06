import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInterface } from '@dataModul/data';
import { MediaFrameComponent } from './media-frame.component';
import { LoadingComponent } from '../../web/shared/loading/loading.component';

@Component({
  selector: 'app-media-image-frame',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  template: `
    @defer (on viewport) {
      <img [src]="folder+url" alt="" class="w-full h-full object-cover fade-in bg-gray-200">
    }@placeholder {
      <app-loading/>
    }@loading (){
      <app-loading/>
    }
  `
})
export class MediaImageFrameComponent extends MediaFrameComponent{

}

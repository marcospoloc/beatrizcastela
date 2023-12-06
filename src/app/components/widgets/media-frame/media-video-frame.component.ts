import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaFrameComponent } from './media-frame.component';
import { LoadingComponent } from '../../web/shared/loading/loading.component';

@Component({
  selector: 'app-media-video-frame',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  template: `
    @defer (on viewport) {
      <video (mouseenter)="changeVideo(true)" (mouseleave)="changeVideo(false)" #videoElement class="w-full h-full" muted loop>
          <source [src]="folder+url" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
    }@placeholder {
      <app-loading/>
    }@loading (){
      <app-loading/>
    }
  `
})
export class MediaVideoFrameComponent extends MediaFrameComponent{
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  @Input()activarVideo: boolean = false;

  isHovered: boolean = false;

  ngOnChanges() {
    console.log("ACTIVE => "+this.videoElement?.nativeElement);
    this.changeVideo(this.activarVideo);
  }

  changeVideo(state:boolean){
    if (state) {
      this.videoElement?.nativeElement.play();
    } else {
      this.videoElement?.nativeElement.pause();
    }
  }
}

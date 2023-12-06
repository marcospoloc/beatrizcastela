import { Directive, Input } from '@angular/core';
import { ImageInterface } from '@dataModul/data';

@Directive({
  selector: 'mediaFrameComponent',
})

export class MediaFrameComponent {
  @Input()folder:String = '';
  @Input()url:string = '';
  @Input()image:ImageInterface | undefined;
}

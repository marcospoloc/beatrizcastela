import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInterface, Mosaic, RowImagesInterface } from '@dataModul/data';

@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./image-widget.component.html',
})

export class ImageWidgetComponent implements OnInit{
  @Input({required:true})item:RowImagesInterface | undefined;
  @Input({required:true})folder:String | undefined;

  classId:string = '';

  constructor(private ref:ElementRef, private renderer:Renderer2){}

  ngOnInit(): void {
    const cont = this.ref.nativeElement;
    cont.classList.add('images-widget');

    if(this.item?.class){
      this.classId = this.item?.class;
      cont.classList.add(this.classId);
    }

    if(this.item?.styles){
      for (const [key, value] of Object.entries(this.item.styles)) {
        this.renderer.setStyle(cont,key,value);
      }
    }


  }
}

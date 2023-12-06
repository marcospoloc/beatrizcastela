import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowSpaceInterface } from '@dataModul/data';

@Component({
  selector: 'app-space-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full" [ngStyle]="{'height':item?.space}"></div>
  `,
})
export class SpaceWidgetComponent implements OnInit{
  @Input({required:true})item:RowSpaceInterface | undefined;
  @Input({required:true})folder:String | undefined;

  ngOnInit(): void {
      ;
  }
}

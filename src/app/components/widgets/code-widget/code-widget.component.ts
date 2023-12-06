import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowCodeInterface } from '@dataModul/data';

@Component({
  selector: 'app-code-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>CODE</p>
  `,
})
export class CodeWidgetComponent {
  @Input({required:true})item:RowCodeInterface | undefined;
}

import { Component, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomString, RowTextInterface } from '@dataModul/data';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class TextWidgetComponent implements OnInit{
  @Input({required:true})item:RowTextInterface | undefined;
  @Input({required:true})folder:String | undefined;

  constructor(private ref:ElementRef,private renderer:Renderer2) {}

  ngOnInit(): void {

    this.ref.nativeElement.classList.add('text-widget');
    this.ref.nativeElement.classList.add('fade-in');
    this.ref.nativeElement.classList.add(this.item?.class);
    this.loadFieldComponents();
  }

  loadFieldComponents():void{
    if(this.item){
      const isHeader:boolean = (this.item.class ==='texto-principal');
      this.loadField(isHeader?'h1':'h2','title',this.item.title);
      this.loadField(isHeader?'h2':'h3','subtitle',this.item.subtitle);
      this.loadField('p','location',this.item.location);
      this.loadField('p','technique',this.item.technique);
      this.loadField('p','text',this.item.text);
      this.loadField('p','cv_title',this.item.cv_title);
      this.loadArrayData('p','cv_text',this.item.cv_text);
    }
  }

  loadField(tag:string,fieldClass:string,field:CustomString | undefined):void{
    if(!field)return;
    const containerElement: HTMLElement = this.ref?.nativeElement;
    const nuevoElemento = document.createElement(tag);
    nuevoElemento.classList.add('text-field');
    nuevoElemento.classList.add(fieldClass);
    if(field.text)nuevoElemento.innerHTML = field.text;
    containerElement.appendChild(nuevoElemento);
  }

  loadArrayData(tag:string,fieldClass:string,field:string[] | undefined){
    console.log('CVVV');
    if(!field)return;
    console.log(field);
    const containerElement: HTMLElement = this.ref?.nativeElement;
    const nuevoElemento = document.createElement('div');
    this.renderer.setStyle(nuevoElemento,'display','grid');
    this.renderer.setStyle(nuevoElemento,'grid-template-columns','5rem 1fr');
    nuevoElemento.classList.add('text-field');
    nuevoElemento.classList.add(fieldClass);
    field.forEach(item=>{
      const nuevoCad = document.createElement(tag);
      nuevoCad.classList.add(fieldClass);
      nuevoCad.innerHTML = item;
      nuevoElemento.appendChild(nuevoCad);
    });
    containerElement.appendChild(nuevoElemento);
  }



}

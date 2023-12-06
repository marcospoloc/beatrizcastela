import { Component, ElementRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderService } from '../../../services/data-loader.service';
import { GenericRow } from '@dataModul/data';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  template: `
    @if(rows){
      @for(row of rows; track row){
        @defer (on viewport) {
          <ng-container *ngComponentOutlet="row.component;inputs: {'folder':folder,'item':row};"/>
        }@placeholder {
          <app-loading/>
        }@loading (){
          <app-loading/>
        }

      }
    }
  `,
})

export class DynamicPageComponent {

  public title: string = '';
  public folder: string = '';
  public rows: GenericRow[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: DataLoaderService,
    private el: ElementRef,
    private viewContainer: ViewContainerRef) {
    const containerElement: HTMLElement = this.el?.nativeElement;
    containerElement.classList.add('dynamic-page');
    this.route.params.subscribe(params => {
      this.title = params['id'];
      console.log(' ===> ');
      console.log(this.title);
      const menuItem = this.service.getMenuItem(this.title);
      this.scrollToTop();
      if (menuItem == null) this.navigateTo();
      if (menuItem) {
        this.rows = menuItem.file;
        this.folder = menuItem.folder;
      }
    });
  }

  navigateTo() {
    this.router.navigate(['/']);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}

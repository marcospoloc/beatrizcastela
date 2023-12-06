import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '@dataModul/data';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  menu: MenuItem[]=[];
  activeVideo: boolean[]=[];

  constructor(private router: Router,private dataService:DataLoaderService){
    this.menu = dataService.getMenu();
    this.activeVideo = new Array(this.menu.length).fill(false);
    this.scrollToTop();
  }

  onHoverChange(index:number,state:boolean){
    this.activeVideo[index] = state;
  }

  navigateTo(menuItem: MenuItem) {
    this.router.navigate([menuItem.link]);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}


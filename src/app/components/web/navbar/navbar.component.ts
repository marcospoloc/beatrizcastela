import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '@dataModul/data';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLoaderService } from 'src/app/services/data-loader.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public title : string = 'beatriz castela';
  public menu : MenuItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataLoaderService) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      //this.menu.forEach()
    });

  }

  ngOnInit() {
    this.menu = this.dataService.getMenu();
  }

  navigateTo(menuItem: MenuItem) {
    this.router.navigate([menuItem.link]);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

}

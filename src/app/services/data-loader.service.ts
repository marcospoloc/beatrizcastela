import { Injectable } from '@angular/core';
import { MenuItem } from '../models/data';
import * as data from '../../assets/pages/_menu';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  public menu : MenuItem[] = [];

  constructor() {
    this.menu = data.menu;
   }

   getMenu():MenuItem[]{
    console.log(this.menu);
    return this.menu;
   }

   getMenuItem(name:string):MenuItem | undefined{
    return this.menu.find(item =>item.link === name);
   }

}

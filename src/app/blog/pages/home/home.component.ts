import {Component, OnInit} from '@angular/core';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {HomeModel} from '../../models/home.model';

// Sidenav mode constants
export const SIDENAV_MODE_SIDE: MatDrawerMode = 'side';
export const SIDENAV_MODE_OVER: MatDrawerMode = 'over';
export const SIDENAV_MODE_PUSH: MatDrawerMode = 'push';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public home: HomeModel = {
    title: 'Club Escalada Costa Blanca',
    sidebar: {
      partners: 'Hazte socio',
      about: 'Información',
      blog: 'Blog',
      contact: 'Contacto'
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  public closeSidenav(drawer: MatSidenav): void {
    if (this.isMobile) {
      drawer.close().then(() => console.log('Closed'));
    }
  }

  public get isMobile(): boolean {
    return window.innerWidth < 768;
  }

  public get sidenavMode(): MatDrawerMode {
    return this.isMobile
      ? SIDENAV_MODE_PUSH
      : SIDENAV_MODE_SIDE;
  }

}

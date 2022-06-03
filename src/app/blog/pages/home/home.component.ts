import {Component, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerMode, MatSidenav} from '@angular/material/sidenav';

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

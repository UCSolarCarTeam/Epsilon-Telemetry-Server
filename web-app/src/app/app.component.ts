import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Battery',
        link: './battery',
        index: 0
      },
      {
        label: 'Controls',
        link: './controls',
        index: 1
      },
      {
        label: 'Motor',
        link: './motor',
        index: 2
      },
      {
        label: 'MPPT',
        link: './mppt',
        index: 3
      },
      {
        label: 'Faults',
        link: './faults',
        index: 4
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(
        this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  getActiveClass(indexofRouteLink) {
    let tabsclass = 'mat-tab-link';
    if (this.activeLinkIndex === indexofRouteLink) {
      tabsclass = 'mat-tab-link mat-tab-label-active';
    }

    return tabsclass;
  }
}

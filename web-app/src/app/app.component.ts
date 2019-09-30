import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private router: Router
  ) {
    this.registerIcons();
    this.routeLinks = [
      {
        label: '\xa0\xa0Battery\xa0\xa0\xa0',
        link: './battery',
        icon: 'battery_icon',
        index: 0
      },
      {
        label: '\xa0Controls\xa0\xa0',
        link: './controls',
        icon: 'controls_icon',
        index: 1
      },
      {
        label: '\xa0\xa0\xa0Motor\xa0\xa0\xa0\xa0',
        link: './motor',
        icon: 'motor_icon',
        index: 2
      },
      {
        label: '\xa0\xa0MPPT\xa0\xa0\xa0\xa0',
        link: './mppt',
        icon: 'mppt_icon',
        index: 3
      },
      {
        label: '\xa0\xa0 Faults\xa0\xa0\xa0\xa0',
        link: './faults',
        icon: 'faults_icon',
        index: 4
      },
      {
        label: 'Race\xa0\xa0\xa0\xa0\xa0',
        link: './race',
        // icon: 'faults_icon',
        index: 5
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

  registerIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'battery_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/battery_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'controls_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/steering_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'mppt_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/mppt_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'motor_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/motor_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'faults_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/faults_icon.svg')
    );
  }
}

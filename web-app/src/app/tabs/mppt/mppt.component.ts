import { Component, OnInit } from '@angular/core';

import { Mppt } from '../../_objects/mppt';
import { MpptService } from '../../_services/mppt.service';

@Component({
  selector: 'app-mppt',
  templateUrl: './mppt.component.html',
  styleUrls: ['./mppt.component.css']
})
export class MpptComponent implements OnInit {

	mppt0ArrayVoltage = 0;
	mppt0ArrayCurrent = 0;
	mppt0BatteryVoltage = 0;
	mppt0Temperature = 0;

	mppt1ArrayVoltage = 0;
	mppt1ArrayCurrent = 0;
	mppt1BatteryVoltage = 0;
	mppt1Temperature = 0;

	mppt2ArrayVoltage = 0;
	mppt2ArrayCurrent = 0;
	mppt2BatteryVoltage = 0;
	mppt2Temperature = 0;

  mppt0: Mppt;
  mppt1: Mppt;
  mppt2: Mppt;


  constructor(private mpptService: MpptService) { }

  ngOnInit() {
    this.mppt0 = this.mpptService.getData(0);
    this.mppt1 = this.mpptService.getData(1);
    this.mppt2 = this.mpptService.getData(2);

    this.mpptService.mppt0$.subscribe(
      (data: Mppt) => {
        this.mppt0 = data;
      }
    );

    this.mpptService.mppt1$.subscribe(
      (data: Mppt) => {
        this.mppt1 = data;
      }
    );

    this.mpptService.mppt2$.subscribe(
      (data: Mppt) => {
        this.mppt2 = data;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';

import { MPPT } from '../../_objects/mppt';
import { MPPTService } from '../../_services/mppt.service';

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

  mppt0: MPPT;
  mppt1: MPPT;
  mppt2: MPPT;


  constructor(private mpptService: MPPTService) { }

  ngOnInit() {
    this.mppt0 = this.mpptService.getData(0);
    this.mppt1 = this.mpptService.getData(1);
    this.mppt2 = this.mpptService.getData(2);

    this.motorService.motor0$.subscribe(
      (data: Motor) => {
        this.motor0 = data;
      }
    );

    this.mpptService.mppt1$.subscribe(
      (data: MPPT) => {
        this.mppt1 = data;
      }
    );

    this.mpptService.mppt2$.subscribe(
      (data: MPPT) => {
        this.mppt2 = data;
      }
    );
  }

}

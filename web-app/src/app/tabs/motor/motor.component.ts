import { Component, OnInit } from '@angular/core';

import { Motor } from '../../_objects/motor';
import { MotorService } from '../../_services/motor.service';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css']
})
export class MotorComponent implements OnInit {

  motor0: Motor;
  motor1: Motor;

  constructor(private motorService: MotorService) { }

  ngOnInit() {
    this.motor0 = this.motorService.getData(0);
    this.motor1 = this.motorService.getData(1);

    this.motorService.motor0$.subscribe(
      (data: Motor) => {
        this.motor0 = data;
      }
    );

    this.motorService.motor1$.subscribe(
      (data: Motor) => {
        this.motor1 = data;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { TesttingService } from 'app/_services/testting.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  testPacket: Object;

  constructor(private testService: TesttingService) {}

  ngOnInit() {
    this.testPacket = this.testService.getData();

    this.testService.testPacket$.subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
      }
    );
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { LapData } from '../../../_objects/lapData';
import { LapService } from '../../../_services/lap.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild('table') table: MatTable<LapData>;

  displayedColumns = ['lapNumber', 'lapTime', 'totalPowerIn', 'totalPowerOut', 'netPowerOut', 'distance'];

  lapData: LapData[] = [{
    'lapNumber': 0,
    'lapTime': 'time',
    'totalPowerIn': 0,
    'totalPowerOut': 0,
    'netPowerOut': 0,
    'distance': 0
  }]
  constructor(private lapService: LapService) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngOnInit() {
    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapData = data;
        this.table.renderRows();
      }
    );
  }
}

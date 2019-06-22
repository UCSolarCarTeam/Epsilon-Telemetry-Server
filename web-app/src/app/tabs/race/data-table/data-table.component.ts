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

  displayedColumns =
  ['lapNumber',
  'lapTime',
  'totalPowerIn',
  'totalPowerOut',
  'netPowerOut',
  'distance',
  'amphours',
  'averagePackCurrent', ];

  lapData: LapData[];
  constructor(private lapService: LapService) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngOnInit() {
    this.lapData = this.lapService.getData()
    this.lapService.lapData$.subscribe(
      (data: LapData[]) => {
        this.lapData = data;
        this.table.renderRows();
      }
    );
  }
}

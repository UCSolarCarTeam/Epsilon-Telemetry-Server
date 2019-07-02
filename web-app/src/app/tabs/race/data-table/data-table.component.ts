import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { LapData } from '../../../_objects/lapData';
import { LapService } from '../../../_services/lap.service';
import { ExportService } from '../../../_services/export.service';

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
  'averageSpeed',
  'distance',
  'amphours',
  'averagePackCurrent',
  'dataLabel', ];

  picklist: string[] = 
  ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Full lap', 'Charging', 'Stationary', 'Testing']

  lapData: LapData[];
  constructor(private lapService: LapService, private exportService: ExportService) { }

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

  export() {
    this.exportService.exportExcel(this.lapData, 'lapData');
  }
}

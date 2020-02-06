import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTooltipModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { LapData } from '../../../_objects/lapData';
import { LapService } from '../../../_services/lap.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild('table', {static: false}) table: MatTable<LapData>;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  displayedColumns =
  ['lapNumber',
  'lapTime',
  'totalPowerIn',
  'totalPowerOut',
  'netPowerOut',
  'averageSpeed',
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

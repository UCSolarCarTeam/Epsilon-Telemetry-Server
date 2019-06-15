import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { LapData } from '../../../_objects/lapData';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  lapData: LapData[] = [{
    'lapNumber': 0,
    'lapTime': 'time',
    'totalPowerIn': 0,
    'totalPowerOut': 0,
    'netPowerOut': 0,
    'distance': 0
  }]

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['lapNumber', 'lapTime', 'totalPowerIn', 'totalPowerOut', 'netPowerOut', 'distance'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
  }
}

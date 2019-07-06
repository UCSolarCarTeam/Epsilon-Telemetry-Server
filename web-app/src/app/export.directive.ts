import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ExportService } from './_services/export.service';
import { LapData } from './_objects/lapData';
import { LapService } from './_services/lap.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService, private lapService: LapService) {}

  @Input('appExport') lapData: LapData[];
  @Input() fileName: string;

  @HostListener('click', ['$event']) onClick($event) {
    console.log('clicked: ' + $event);
    this.lapData = this.lapService.getData();
    console.log('Lap Data ' + this.lapData);
    console.log('Label' + this.lapData[0]);

    this.exportService.exportExcel(this.lapData, this.fileName);
  }

}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundingService {

  constructor() { }

  getRoundedValue(value: number, precision: number) {
    if (value == null) {
        return null;
    }
    return Number(value.toFixed(precision));
  }
}

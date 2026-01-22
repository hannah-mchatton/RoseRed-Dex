import { Component, Input } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @Input()
  set locationKey(key: string) {
    this.location = this.dataService.getLocation(key);
  }

  constructor(private dataService: DataService) {}

  public location;

  public getLocationName(key: string): string {
    return this.dataService.getLocation(key).name;
  }
}

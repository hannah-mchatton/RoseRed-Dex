import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.scss'],
})
export class DexComponent implements OnInit {
  public dex = [];

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dex = this.dataService.getDex();
  }

  public getAbilityName(key) {
    return this.dataService.getAbilityName(key);
  }
}

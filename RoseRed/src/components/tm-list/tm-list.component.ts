import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-tm-list',
  templateUrl: './tm-list.component.html',
  styleUrls: ['./tm-list.component.scss'],
})
export class TmListComponent {
  public tmList = [];

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.tmList = this.dataService.getTMs();
  }
}

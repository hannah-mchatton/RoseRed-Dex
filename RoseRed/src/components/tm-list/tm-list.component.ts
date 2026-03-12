import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-tm-list',
  templateUrl: './tm-list.component.html',
  styleUrls: ['./tm-list.component.scss'],
})
export class TmListComponent {
  public tmList = [];
  public universalTms: string[] = [
    'Charm',
    'Agility',
    'Protect',
    'Facade',
    'Endure',
    'Sleep Talk',
    'Rest',
    'Substitute',
    'Encore',
    'Helping Hand',
    'Baton Pass',
    'Giga Impact',
    'Hyper Beam',
    'Roar',
    'Toxic',
    'Endeavor',
    'Swift',
    'Return',
    'Metronome'
  ];

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.tmList = this.dataService.getTMs();
  }
}

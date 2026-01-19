import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {
  public moveList = [];

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.moveList = this.dataService.getMoves();
  }
}

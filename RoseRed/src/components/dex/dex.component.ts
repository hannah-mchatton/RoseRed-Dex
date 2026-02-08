import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Pokemon } from 'src/services/models';

@Component({
  selector: 'app-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.scss'],
})
export class DexComponent implements OnInit {
  public dex: Pokemon[] = [];

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dex = this.dataService.getDex();

    let animFlag = false;
    window.setInterval(() => {
      let icons = document.getElementsByClassName('box-icon')

      if (animFlag) {
        for (let i = 0; i < icons.length; i++) {
          icons[i].className = 'box-icon other-frame'
        }
      }
      else {
        for (let i = 0; i < icons.length; i++) {
          icons[i].className = 'box-icon'
        }
      }

      animFlag = !animFlag;
    }, 500)
  }

  public getAbilityName(key) {
    return this.dataService.getAbilityName(key);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-cell',
  templateUrl: './type-cell.component.html',
  styleUrls: ['./type-cell.component.scss']
})
export class TypeCellComponent {
  @Input() type1: string;
  @Input() type2: string;
}

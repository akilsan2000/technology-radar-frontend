import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Technology } from '../_models';

@Component({
  selector: 'app-technology-history',
  templateUrl: './technology-history.component.html',
  styleUrls: ['./technology-history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TechnologyHistoryComponent {
  @Input() technology: Technology = {
    id: '',
    name: '',
    category: '',
    ring: '',
    technologyDescription: '',
    classificationDescription: ''
  }
  displayedColumns: string[] = ['username', 'datetime'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Technology | null = null;

}

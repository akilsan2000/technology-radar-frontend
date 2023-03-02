import { Component, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-technology-viewer',
  templateUrl: './technology-viewer.component.html',
  styleUrls: ['./technology-viewer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TechnologyViewerComponent {
  displayedColumns: string[] = ['name', 'category', 'ring'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Technology | null = null;

  dataSource: MatTableDataSource<Technology> = new MatTableDataSource();
  dataLoading: boolean = true;

  availableCategories: {text: string, value: string}[] = GlobalConstants.technologyCategories;
  availableRingTypes: {text: string, value: string}[] = GlobalConstants.technologyRingTypes;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  categoryFilter = new FormControl('');
  ringFilter = new FormControl('');

  filterValues: any = {
    category: '',
    ring: ''
  }

  constructor(
    private technologyService: TechnologyService
  ) { }

  ngOnInit() {
    this.technologyService.getTechnologies()
      .subscribe(technologies => {
        this.dataLoading = false;
        this.dataSource = new MatTableDataSource(technologies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      });
    this.fieldListener();
  }

  fieldListener() {
    this.categoryFilter.valueChanges.subscribe(category => {
      this.filterValues.category = category;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.ringFilter.valueChanges.subscribe(ring => {
      this.filterValues.ring = ring;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  createFilter(): (technology: Technology, filter: string) => boolean {
    let filterFunction = function (technology: Technology, filter: string): boolean {
      let searchTerms = JSON.parse(filter);

      return technology.category.indexOf(searchTerms.category) !== -1
        && technology.ring?.indexOf(searchTerms.ring) !== -1;
    }

    return filterFunction;
  }

  clearFilter() {
    this.categoryFilter.setValue('');
    this.ringFilter.setValue('');
  }
}

import { Component, ViewChild } from '@angular/core';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstants } from '../global-constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  technologies : Technology[] = [];
  displayedColumns: string[] = ['name', 'category', 'ring', 'published', 'tools'];

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

  ngOnInit(){
    this.technologyService.getTechnologies()
      .subscribe(technologies => {
        this.technologies = technologies;
        this.dataLoading = false;
        this.dataSource = new MatTableDataSource(technologies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      });
      this.fieldListener();
  }

  deleteTechnology(id: string){
    this.technologyService.deleteTechnology(id)
      .subscribe(() => {
        console.log("deleted");
        this.technologies = this.technologies.filter(technology => technology.id !== id);
        this.dataSource = new MatTableDataSource(this.technologies);
      });
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

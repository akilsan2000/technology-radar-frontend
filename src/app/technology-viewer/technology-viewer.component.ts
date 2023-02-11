import { Component } from '@angular/core';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';

@Component({
  selector: 'app-technology-viewer',
  templateUrl: './technology-viewer.component.html',
  styleUrls: ['./technology-viewer.component.scss']
})
export class TechnologyViewerComponent {
  technologies : Technology[] = [];
  displayedColumns: string[] = ['name', 'category', 'ring', 'technologyDescription'];

  constructor(
    private technologyService: TechnologyService
  ) { }

  ngOnInit(){
    this.technologyService.getTechnologies()
      .subscribe(technologies => {
        this.technologies = technologies;
      });
  }
}

import { Component } from '@angular/core';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  technologies : Technology[] = [];
  displayedColumns: string[] = ['name', 'category', 'ring', 'published', 'tools'];

  constructor(
    private technologyService: TechnologyService
  ) { }

  ngOnInit(){

    this.technologyService.getTechnologies()
      .subscribe(technologies => {
        this.technologies = technologies;
        this.technologies.map(technology => { if(technology.publishDate) {technology.publishDate = new Date(technology.publishDate)}});
      });
  }

  deleteTechnology(id: string){
    this.technologyService.deleteTechnology(id)
      .subscribe(() => {
        console.log("deleted");
        this.technologies = this.technologies.filter(technology => technology.id !== id);
      });
  }
}

import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent {
  technology: Technology = {
    id: '',
    name: '',
    category: '',
    ring: '',
    technologyDescription: '',
    classificationDescription: ''
  }

  constructor(
    private technologyService: TechnologyService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.technologyService.getTechnology(this.route.snapshot.paramMap.get('id')||'', true)
      .subscribe(technology => {
        this.technology = technology;
        if(technology.lastModifiedDate){
          technology.lastModifiedDate = new Date(technology.lastModifiedDate);
        }
        if(technology.createdDate){
          technology.createdDate = new Date(technology.createdDate);
        }
        if(technology.publishDate){
          technology.publishDate = new Date(technology.publishDate);
        }
        technology.history?.map(change => {
          if(change.lastModifiedDate){
            change.lastModifiedDate = new Date(change.lastModifiedDate);
          }
          if(change.createdDate){
            change.createdDate = new Date(change.createdDate);
          }
        })
      });
  }

  goBack(): void {
    this.location.back();
  }
}

import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';

@Component({
  selector: 'app-technology-publish',
  templateUrl: './technology-publish.component.html',
  styleUrls: ['./technology-publish.component.scss']
})
export class TechnologyPublishComponent {
  technologyPublishForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    ring: ['', Validators.required],
    technologyDescription: ['', Validators.required],
    classificationDescription: ['', Validators.required]
  });
  submitted:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private technologyService: TechnologyService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){

    this.technologyService.getTechnology(this.route.snapshot.paramMap.get('id')||'')
      .subscribe(technology => {
        this.technologyPublishForm.setValue({
          name: technology.name||'',
          category: technology.category||'',
          ring: technology.ring||'',
          technologyDescription: technology.technologyDescription||'',
          classificationDescription: technology.classificationDescription||''
        });
      });
  }


  onSubmit(data: any){
    this.submitted = true;
    if(this.technologyPublishForm.invalid){
      return;
    }
    console.log("Submit: ", data);

    this.technologyService.updateTechnology(this.route.snapshot.paramMap.get('id') || '', {...data, isPublished: true, publishDate: new Date()} as Technology)
      .subscribe(() => {
        console.log("published");
        this.router.navigate(['/administration']);
      });
  }

  goBack(): void {
    this.location.back();
  }

}

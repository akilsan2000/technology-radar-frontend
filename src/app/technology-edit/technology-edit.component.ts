import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Technology } from '../_models';
import { TechnologyService } from '../_services';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.scss']
})
export class TechnologyEditComponent {
  technologyEditForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    ring: [''],
    technologyDescription: ['', Validators.required],
    classificationDescription: ['']
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
        this.technologyEditForm.setValue({
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
    if(this.technologyEditForm.invalid){
      return;
    }
    console.log("Submit: ", data);

    this.technologyService.updateTechnology(this.route.snapshot.paramMap.get('id') || '',data as Technology)
      .subscribe(() => {
        console.log("edited");
        this.router.navigate(['/administration']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}

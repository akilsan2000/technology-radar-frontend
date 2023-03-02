import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyService } from '../_services';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-technology-classification',
  templateUrl: './technology-classification.component.html',
  styleUrls: ['./technology-classification.component.scss']
})
export class TechnologyClassificationComponent {
  technologyEditForm: FormGroup = this.formBuilder.group({
    ring: ['', Validators.required],
    classificationDescription: ['', Validators.required]
  });
  submitted:boolean=false;

  availableCategories: {text: string, value: string}[] = GlobalConstants.technologyCategories;
  availableRingTypes: {text: string, value: string}[] = GlobalConstants.technologyRingTypes;


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
          ring: technology.ring||'',
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

    this.technologyService.patchTechnology(this.route.snapshot.paramMap.get('id') || '',data)
      .subscribe(() => {
        console.log("edited");
        this.router.navigate(['/administration']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}

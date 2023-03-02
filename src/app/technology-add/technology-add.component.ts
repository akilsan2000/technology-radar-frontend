import { Component, Input } from '@angular/core';
import { Technology } from '../_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TechnologyService } from '../_services';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';


@Component({
  selector: 'app-technology-add',
  templateUrl: './technology-add.component.html',
  styleUrls: ['./technology-add.component.scss']
})
export class TechnologyAddComponent {
  technologyAddForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    ring: [''],
    technologyDescription: ['', Validators.required]
  });
  submitted:boolean=false;

  availableCategories: {text: string, value: string}[] = GlobalConstants.technologyCategories;
  availableRingTypes: {text: string, value: string}[] = GlobalConstants.technologyRingTypes;

  // technology: Technology;

  constructor(
    private formBuilder: FormBuilder,
    private technologyService: TechnologyService,
    private location: Location,
    private router: Router
  ) { }


  onSubmit(data: any){
    this.submitted = true;
    if(this.technologyAddForm.invalid){
      return;
    }
    console.log("Submit: ", data);

    this.technologyService.addTechnology(data as Technology)
      .subscribe(technology => {
        console.log("added");
        this.router.navigate(['/administration']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}

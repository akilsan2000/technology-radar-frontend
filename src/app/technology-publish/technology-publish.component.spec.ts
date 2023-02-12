import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyPublishComponent } from './technology-publish.component';

describe('TechnologyPublishComponent', () => {
  let component: TechnologyPublishComponent;
  let fixture: ComponentFixture<TechnologyPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyPublishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

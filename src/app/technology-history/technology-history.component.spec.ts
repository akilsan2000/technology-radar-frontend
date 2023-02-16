import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyHistoryComponent } from './technology-history.component';

describe('TechnologyHistoryComponent', () => {
  let component: TechnologyHistoryComponent;
  let fixture: ComponentFixture<TechnologyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

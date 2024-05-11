import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterventionTechComponent } from './list-intervention-tech.component';

describe('ListInterventionTechComponent', () => {
  let component: ListInterventionTechComponent;
  let fixture: ComponentFixture<ListInterventionTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListInterventionTechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInterventionTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

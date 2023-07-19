import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDetailComponent } from './train-detail.component';

describe('TrainDetailComponent', () => {
  let component: TrainDetailComponent;
  let fixture: ComponentFixture<TrainDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainDetailComponent]
    });
    fixture = TestBed.createComponent(TrainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

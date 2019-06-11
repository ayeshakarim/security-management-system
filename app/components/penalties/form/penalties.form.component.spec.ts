import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltiesFormComponent } from './penalties.form.component';

describe('PenaltiesFormComponent', () => {
  let component: PenaltiesFormComponent;
  let fixture: ComponentFixture<PenaltiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

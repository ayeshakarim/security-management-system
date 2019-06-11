import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensesFormComponent } from './offenses.form.component';

describe('OffensesFormComponent', () => {
  let component: OffensesFormComponent;
  let fixture: ComponentFixture<OffensesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffensesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

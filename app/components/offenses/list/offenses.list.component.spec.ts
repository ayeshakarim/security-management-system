import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensesListComponent } from './offenses.list.component';

describe('OffensesListComponent', () => {
  let component: OffensesListComponent;
  let fixture: ComponentFixture<OffensesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffensesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

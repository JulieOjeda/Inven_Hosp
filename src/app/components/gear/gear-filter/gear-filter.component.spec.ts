import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearFilterComponent } from './gear-filter.component';

describe('GearFilterComponent', () => {
  let component: GearFilterComponent;
  let fixture: ComponentFixture<GearFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

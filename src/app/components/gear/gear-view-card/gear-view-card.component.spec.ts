import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearViewCardComponent } from './gear-view-card.component';

describe('GearViewCardComponent', () => {
  let component: GearViewCardComponent;
  let fixture: ComponentFixture<GearViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearViewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

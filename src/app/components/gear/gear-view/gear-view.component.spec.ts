import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearViewComponent } from './gear-view.component';

describe('GearViewComponent', () => {
  let component: GearViewComponent;
  let fixture: ComponentFixture<GearViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearBoardComponent } from './gear-board.component';

describe('GearBoardComponent', () => {
  let component: GearBoardComponent;
  let fixture: ComponentFixture<GearBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

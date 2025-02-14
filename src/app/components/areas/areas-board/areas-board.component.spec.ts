import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasBoardComponent } from './areas-board.component';

describe('AreasBoardComponent', () => {
  let component: AreasBoardComponent;
  let fixture: ComponentFixture<AreasBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreasBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

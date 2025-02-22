import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCardViewComponent } from './area-card-view.component';

describe('AreaCardViewComponent', () => {
  let component: AreaCardViewComponent;
  let fixture: ComponentFixture<AreaCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaCardViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

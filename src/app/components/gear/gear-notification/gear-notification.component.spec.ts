import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearNotificationComponent } from './gear-notification.component';

describe('GearNotificationComponent', () => {
  let component: GearNotificationComponent;
  let fixture: ComponentFixture<GearNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProperySpaceComponent } from './property-space.component';

describe('ProperySpaceComponent', () => {
  let component: ProperySpaceComponent;
  let fixture: ComponentFixture<ProperySpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProperySpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProperySpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

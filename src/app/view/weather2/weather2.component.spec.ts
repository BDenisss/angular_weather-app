import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Weather2Component } from './weather2.component';

describe('Weather2Component', () => {
  let component: Weather2Component;
  let fixture: ComponentFixture<Weather2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Weather2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Weather2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

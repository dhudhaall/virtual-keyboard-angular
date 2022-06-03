import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngVirtualKeyboardComponent } from './ang-virtual-keyboard.component';

describe('AngVirtualKeyboardComponent', () => {
  let component: AngVirtualKeyboardComponent;
  let fixture: ComponentFixture<AngVirtualKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngVirtualKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngVirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetflowDeleteComponent } from './greetflow-delete.component';

describe('GreetflowDeleteComponent', () => {
  let component: GreetflowDeleteComponent;
  let fixture: ComponentFixture<GreetflowDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetflowDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreetflowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

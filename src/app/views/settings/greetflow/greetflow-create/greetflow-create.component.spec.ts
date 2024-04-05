import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetflowCreateComponent } from './greetflow-create.component';

describe('GreetflowCreateComponent', () => {
  let component: GreetflowCreateComponent;
  let fixture: ComponentFixture<GreetflowCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetflowCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreetflowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

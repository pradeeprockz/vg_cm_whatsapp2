import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetflowUpdateComponent } from './greetflow-update.component';

describe('GreetflowUpdateComponent', () => {
  let component: GreetflowUpdateComponent;
  let fixture: ComponentFixture<GreetflowUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetflowUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreetflowUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

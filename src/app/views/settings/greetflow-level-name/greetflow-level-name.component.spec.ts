import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetflowLevelNameComponent } from './greetflow-level-name.component';

describe('GreetflowLevelNameComponent', () => {
  let component: GreetflowLevelNameComponent;
  let fixture: ComponentFixture<GreetflowLevelNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetflowLevelNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreetflowLevelNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

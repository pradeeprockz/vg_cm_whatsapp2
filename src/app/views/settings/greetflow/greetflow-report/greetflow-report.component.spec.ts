import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetflowReportComponent } from './greetflow-report.component';

describe('GreetflowReportComponent', () => {
  let component: GreetflowReportComponent;
  let fixture: ComponentFixture<GreetflowReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetflowReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreetflowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

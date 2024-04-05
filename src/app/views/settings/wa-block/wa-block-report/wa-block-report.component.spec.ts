import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaBlockReportComponent } from './wa-block-report.component';

describe('WaBlockReportComponent', () => {
  let component: WaBlockReportComponent;
  let fixture: ComponentFixture<WaBlockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaBlockReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaBlockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

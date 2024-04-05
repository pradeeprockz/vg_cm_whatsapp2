import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgtBaseReportComponent } from './vgt-base-report.component';

describe('VgtBaseReportComponent', () => {
  let component: VgtBaseReportComponent;
  let fixture: ComponentFixture<VgtBaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VgtBaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgtBaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

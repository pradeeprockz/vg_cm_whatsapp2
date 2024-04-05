import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSumReportComponent } from './msg-sum-report.component'

describe('MsgSumReportComponent', () => {
  let component: MsgSumReportComponent;
  let fixture: ComponentFixture<MsgSumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgSumReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgSumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

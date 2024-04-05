import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompHeaderParamsDeleteComponent } from './cms-temp-wa-comp-header-params-delete.component';

describe('CmsTempWaCompHeaderParamsDeleteComponent', () => {
  let component: CmsTempWaCompHeaderParamsDeleteComponent;
  let fixture: ComponentFixture<CmsTempWaCompHeaderParamsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompHeaderParamsDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompHeaderParamsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

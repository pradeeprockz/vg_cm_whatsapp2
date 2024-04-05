import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompHeaderParamsUpdateComponent } from './cms-temp-wa-comp-header-params-update.component';

describe('CmsTempWaCompHeaderParamsUpdateComponent', () => {
  let component: CmsTempWaCompHeaderParamsUpdateComponent;
  let fixture: ComponentFixture<CmsTempWaCompHeaderParamsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompHeaderParamsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompHeaderParamsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

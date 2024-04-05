import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompHeaderParamsCreateComponent } from './cms-temp-wa-comp-header-params-create.component';

describe('CmsTempWaCompHeaderParamsCreateComponent', () => {
  let component: CmsTempWaCompHeaderParamsCreateComponent;
  let fixture: ComponentFixture<CmsTempWaCompHeaderParamsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompHeaderParamsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompHeaderParamsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

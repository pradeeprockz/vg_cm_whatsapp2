import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompParamsCreateComponent } from './cms-temp-wa-comp-params-create.component';

describe('CmsTempWaCompParamsCreateComponent', () => {
  let component: CmsTempWaCompParamsCreateComponent;
  let fixture: ComponentFixture<CmsTempWaCompParamsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompParamsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompParamsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

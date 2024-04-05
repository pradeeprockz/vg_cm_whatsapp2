import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompParamsUpdateComponent } from './cms-temp-wa-comp-params-update.component';

describe('CmsTempWaCompParamsUpdateComponent', () => {
  let component: CmsTempWaCompParamsUpdateComponent;
  let fixture: ComponentFixture<CmsTempWaCompParamsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompParamsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompParamsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

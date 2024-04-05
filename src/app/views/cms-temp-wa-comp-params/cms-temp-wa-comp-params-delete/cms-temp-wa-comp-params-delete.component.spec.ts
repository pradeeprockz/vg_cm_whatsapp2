import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompParamsDeleteComponent } from './cms-temp-wa-comp-params-delete.component';

describe('CmsTempWaCompParamsDeleteComponent', () => {
  let component: CmsTempWaCompParamsDeleteComponent;
  let fixture: ComponentFixture<CmsTempWaCompParamsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompParamsDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompParamsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

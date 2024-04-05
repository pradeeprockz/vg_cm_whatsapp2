import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponentsUpdateComponent } from './cms-components-update.component';

describe('CmsComponentsUpdateComponent', () => {
  let component: CmsComponentsUpdateComponent;
  let fixture: ComponentFixture<CmsComponentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsComponentsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsComponentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

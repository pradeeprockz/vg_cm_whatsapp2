import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTemplateUpdateComponent } from './cms-template-update.component';

describe('CmsTemplateUpdateComponent', () => {
  let component: CmsTemplateUpdateComponent;
  let fixture: ComponentFixture<CmsTemplateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTemplateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTemplateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTemplateCreateComponent } from './cms-template-create.component';

describe('CmsTemplateCreateComponent', () => {
  let component: CmsTemplateCreateComponent;
  let fixture: ComponentFixture<CmsTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTemplateCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTemplateDeleteComponent } from './cms-template-delete.component';

describe('CmsTemplateDeleteComponent', () => {
  let component: CmsTemplateDeleteComponent;
  let fixture: ComponentFixture<CmsTemplateDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTemplateDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTemplateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

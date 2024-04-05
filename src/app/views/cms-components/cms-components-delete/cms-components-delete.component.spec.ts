import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponentsDeleteComponent } from './cms-components-delete.component';

describe('CmsComponentsDeleteComponent', () => {
  let component: CmsComponentsDeleteComponent;
  let fixture: ComponentFixture<CmsComponentsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsComponentsDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsComponentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponentsCreateComponent } from './cms-components-create.component';

describe('CmsComponentsCreateComponent', () => {
  let component: CmsComponentsCreateComponent;
  let fixture: ComponentFixture<CmsComponentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsComponentsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsComponentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

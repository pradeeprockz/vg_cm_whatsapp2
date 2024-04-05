import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaBlockCreateComponent } from './wa-block-create.component';

describe('WaBlockCreateComponent', () => {
  let component: WaBlockCreateComponent;
  let fixture: ComponentFixture<WaBlockCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaBlockCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaBlockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

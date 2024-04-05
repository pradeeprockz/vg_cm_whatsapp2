import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaBlockUpdateComponent } from './wa-block-update.component';

describe('WaBlockUpdateComponent', () => {
  let component: WaBlockUpdateComponent;
  let fixture: ComponentFixture<WaBlockUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaBlockUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaBlockUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

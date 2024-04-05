import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaBlockDeleteComponent } from './wa-block-delete.component';

describe('WaBlockDeleteComponent', () => {
  let component: WaBlockDeleteComponent;
  let fixture: ComponentFixture<WaBlockDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaBlockDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaBlockDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

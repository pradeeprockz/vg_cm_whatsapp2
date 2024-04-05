import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsCreateComponent } from './user-details-create.component';

describe('PwdChangeComponent', () => {
  let component: UserDetailsCreateComponent;
  let fixture: ComponentFixture<UserDetailsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskCreateComponent } from './disk-create.component';

describe('DiskCreateComponent', () => {
  let component: DiskCreateComponent;
  let fixture: ComponentFixture<DiskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

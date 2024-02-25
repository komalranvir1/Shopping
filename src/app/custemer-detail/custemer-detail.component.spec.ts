import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustemerDetailComponent } from './custemer-detail.component';

describe('CustemerDetailComponent', () => {
  let component: CustemerDetailComponent;
  let fixture: ComponentFixture<CustemerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustemerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustemerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

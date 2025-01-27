import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutnerComponent } from './coutner.component';

describe('CoutnerComponent', () => {
  let component: CoutnerComponent;
  let fixture: ComponentFixture<CoutnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoutnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoutnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

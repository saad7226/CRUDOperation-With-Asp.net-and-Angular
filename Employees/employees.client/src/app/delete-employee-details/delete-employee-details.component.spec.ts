import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmployeeDetailsComponent } from './delete-employee-details.component';

describe('DeleteEmployeeDetailsComponent', () => {
  let component: DeleteEmployeeDetailsComponent;
  let fixture: ComponentFixture<DeleteEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEmployeeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

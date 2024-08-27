import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServicesService } from '../EmployeeServicesService';
import { Employee } from '../employee';

@Component({
  selector: 'app-delete-employee-details',
  templateUrl: './delete-employee-details.component.html',
  styleUrl: './delete-employee-details.component.css'
})
export class DeleteEmployeeDetailsComponent {


  deleteEmployeeForm!: FormGroup;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.deleteEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeAge: ['', Validators.required],
      employeeGender: ['', Validators.required],
    });


    const employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.employeeId = employeeId;

    if (employeeId) {

      this.loadEmployeeDetailsById(employeeId);
    } else {
      console.error('Invalid employee ID');
    }
  }

  loadEmployeeDetailsById(employeeId: number) {
    console.log("Fetching Employee ID:", employeeId);

    this.employeeService.getEmployeeId(employeeId).subscribe(
      (employee: Employee) => {
        console.log("Received Employee Details:", employee);


        if (employee) {
          this.deleteEmployeeForm.patchValue({
            employeeName: employee.name,
            employeeAge: employee.age,
            employeeGender: employee.gender,
          });
        } else {
          console.error("Employee not found");
        }
      },
      error => {
        console.error("Error fetching employee details", error);
      }
    );
  }

  onSubmitForm() {
    if (this.deleteEmployeeForm.valid) {
      


      this.employeeService.deleteEmployee(this.employeeId).subscribe(() => {
        console.log("Deleted employee")
        this.router.navigate(['/EmployeeDetails']);

      })
    }
  }

}

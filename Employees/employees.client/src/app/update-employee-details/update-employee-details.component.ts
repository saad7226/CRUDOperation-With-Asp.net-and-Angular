import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServicesService } from '../EmployeeServicesService';
import { Employee } from '../employee';

@Component({
  selector: 'app-update-employee-details',
  templateUrl: './update-employee-details.component.html',
  styleUrls: ['./update-employee-details.component.css'] 
})
export class UpdateEmployeeDetailsComponent implements OnInit {

  updateEmployeeForm!: FormGroup;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.updateEmployeeForm = this.fb.group({
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
          this.updateEmployeeForm.patchValue({
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
    if (this.updateEmployeeForm.valid) {
      const employee: Employee = {
        id: this.employeeId, 
        name: this.updateEmployeeForm.value.employeeName,
        age: this.updateEmployeeForm.value.employeeAge,
        gender: this.updateEmployeeForm.value.employeeGender,
      };

      
      this.employeeService.updateEmployee(this.employeeId,employee).subscribe(() => {
        console.log("Updated employee", employee)
        this.router.navigate(['/EmployeeDetails']);

      })
    }
  }

}

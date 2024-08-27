import { Component } from '@angular/core';
import { EmployeeServicesService } from '../EmployeeServicesService';
import { Employee } from '../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employee: Employee = {
    id: 0,
    name: '',
    age: 0,
    gender: ''
  };

  constructor(private employeeservice: EmployeeServicesService, private router: Router) { }

  onSubmitForm() {
    if (this.isValidEmployee(this.employee)) {
      this.employeeservice.addEmployee(this.employee).subscribe(() => {
        console.log("Employee added successfully", this.employee);
        this.router.navigate(['/EmployeeDetails']);
      });
    } else {
      console.log("Error in adding employee", this.employee);
    }
  }

  
  isValidEmployee(employee: Employee): boolean {
    return (employee.name?.trim() || '') !== '' && employee.age > 0 && (employee.gender?.trim() || '') !== '';
  }


}

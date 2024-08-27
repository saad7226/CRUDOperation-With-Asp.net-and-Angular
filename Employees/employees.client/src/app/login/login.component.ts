import { Component } from '@angular/core';
import { EmployeeServicesService } from '../EmployeeServicesService';
import { Employee } from '../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeServicesService, private router: Router) {
    this.employeeService.getEmployeeDetails().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
  onClick(employeeid: number, employeename: any) {
    const found = this.employees.find(employee =>
      employee.id === employeeid && employee.name === employeename
    );

    console.warn(typeof (employeeid))
    console.warn(this.employees);
    if (found) {
      alert('Employee found. Login successful.');
      sessionStorage.setItem("isLoggedIn", "true");
      this.router.navigate(['/EmployeeDetails']);

    } else {
      alert('Employee not found. Login failed.');
      sessionStorage.setItem("isLoggedIn", "false");
    }
    console.log(employeeid,employeename)
  }

  onSignupClick() {
    this.router.navigate(['/AddEmployee'])
  }

  onLogoutButtonClick() {
    sessionStorage.setItem("isLoggedIn", "false");
    alert('Employee Logged out');
    
  }
}

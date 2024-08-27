import { Component, ViewChild, OnInit } from '@angular/core';
import { EmployeeServicesService } from '../EmployeeServicesService';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../employee';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  
})
export class EmployeeDetailsComponent implements OnInit {
  employees: Employee[] = [];
  paginatedEmployees: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['id', 'name', 'age', 'gender', 'update', 'delete'];
  searchedId!: number;
  num!: number;
  size!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeServicesService) { }

  length = 10
  pageSize = 10
  pageIndex = 0
  ngOnInit() {
    this.employeeService.getEmployeeByPagination(1, 10).subscribe(employee => {
      this.employees = employee;
      this.paginatedEmployees = new MatTableDataSource(this.employees);
      this.paginatedEmployees.paginator = this.paginator;
      this.paginatedEmployees.sort = this.sort;
    });
    this.employeeService.getEmployeeCount().subscribe(employee => {
      this.pageSize = employee;
    });
  }

  onSearchButtonClicked() {
    if (this.searchedId) {
      this.employeeService.getEmployeeId(this.searchedId).subscribe(employee => {
        if (employee) {
          this.paginatedEmployees.data = [employee];
        } else {
          this.paginatedEmployees.data = [];
          alert(`No record found for ID ${this.searchedId}`);
        }
        this.paginator.firstPage();
      });
    } else {
      this.paginatedEmployees.data = this.employees;
      alert('Please provide an employee ID');
      this.paginator.firstPage();
    
    }
 
  }

  onPaginateChange(event: PageEvent)
  {
    debugger;

    this.employeeService.getEmployeeByPagination(event.pageIndex + 1, event.pageSize).subscribe(employee => {
      
      this.paginatedEmployees.data = employee;
      this.paginatedEmployees.paginator = this.paginator;
      this.paginatedEmployees.sort = this.sort;
      this.employees = employee;

      length = event.length
      this.pageSize = event.pageSize
      this.pageIndex = event.pageIndex

    });
    console.warn(this.size);
  }

  //onPaginateChange(event:PageEvent) {
  //  if (this.pageIndex !== event.pageIndex) {
  //    console.log(event.pageIndex);
  //    this.pageIndex = event.pageIndex;
  //  }
  //}
  
}

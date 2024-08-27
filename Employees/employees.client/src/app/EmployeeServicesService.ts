import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Employee } from "./employee";





@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  private baseurl = 'https://localhost:7264/api/';

  constructor(private http: HttpClient) { }
  getEmployeeDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}Employee`)

      .pipe(
        catchError(error => {
          console.log("While fetching Employee Detail", error);
          return throwError(error);
        })
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Employee>(`${this.baseurl}Employee/`, employee, httpOptions)

      .pipe(
        catchError(error => {
          console.log("Error while adding the employee", error);
          return throwError(error);
        })
      );
  }

  getEmployeeId(id: number): Observable<Employee> {
   
    return this.http.get<any>(`${this.baseurl}Employee/${id}`)
      .pipe(
        catchError(error => {
          console.log("While fetching Employee Detail", error);
          alert("Issue in fetching employee detail")
          return throwError(error);
        })
      );
  }

  getEmployeeByPagination(pageNumber: number,pageSize:number): Observable<Employee[]> {

    return this.http.get<Employee[]>(`${this.baseurl}Employee/${pageNumber},${pageSize}`)
      .pipe(
        catchError(error => {
          console.log("While fetching Employee Detail By Pagination Method", error);
          alert("Issue in fetching employee detail")
          return throwError(error);
        })
      );
  }

  updateEmployee(id:number,employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Employee>(`${this.baseurl}Employee?id=${id}`, employee, httpOptions)

      .pipe(
        catchError(error => {
          console.log("Error while updating the employee", error);
          return throwError(error);
        })
      );
  }

  deleteEmployee(id: number): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<void>(`${this.baseurl}Employee/${id}`, httpOptions)
      .pipe(
        catchError(error => {
          console.log("Error while deleting the employee", error);
          return throwError(error);
        })
      );
  }

  getEmployeeCount(): Observable<number> {
    return this.http.get<number>(`${this.baseurl}Employee/GetCount`)

      .pipe(
        catchError(error => {
          console.log("While fetching Employee Detail", error);
          return throwError(error);
        })
      );
  }

}

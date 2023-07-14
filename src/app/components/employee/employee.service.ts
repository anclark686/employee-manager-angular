import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmployees(deptId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.apiServerUrl}/departments/${deptId}/employees`
    );
  }

  public addEmployee(deptId: number, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.apiServerUrl}/departments/${deptId}/employees`,
      employee
    );
  }

  public updateEmployee(
    deptId: number,
    employee: Employee
  ): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiServerUrl}/departments/${deptId}/employees/${employee.id}`,
      employee
    );
  }

  public deleteEmployee(deptId: number, employeeId: Number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/departments/${deptId}/employees/${employeeId}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`)
  }

  public createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiServerUrl}/departments`, department)
  }

  public findDepartment(deptId: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiServerUrl}/departments/${deptId}`)
  }

  public updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiServerUrl}/departments/${department.id}`, department)
  }

  public deleteDepartment(deptId: number): Observable<Department[]> {
    return this.http.delete<any>(`${this.apiServerUrl}/departments/${deptId}`)
  }
}

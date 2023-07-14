import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Department } from './department';
import { DepartmentService } from './department.service';
import { EmployeeComponent } from '../employee/employee.component';
import { Employee } from '../employee/employee';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'department-container',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  public departments: Department[] = [];
  public editDepartment: Department;
  public deleteDepartment: Department;
  public departmentId: number;
  public employees: Employee[] = [];
  public edit: boolean;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  @ViewChild(EmployeeComponent)
  employeeComponent: EmployeeComponent;

  @ViewChild(EmployeeFormComponent)
  employeeFormComponent: EmployeeFormComponent;

  public getDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (response: Department[]) => {
        this.departments = response;
        console.log(response);
      },
      error: (error: HttpErrorResponse) => console.log(error),
      complete: () => {}
    });
  }

  public onAddDepartment(addForm: NgForm): void {
    document.getElementById('close-add-modal').click();
    console.log(addForm.value);
    this.departmentService.createDepartment(addForm.value).subscribe({
      next: (response: Department) => {
        console.log(response);
        this.getDepartments();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => console.log(error),
      complete: () => {}
    });
  }

  public onUpdateDepartment(department: Department): void {
    document.getElementById('close-edit-modal').click();
    console.log("before")
    console.log(department)
    this.departmentService.updateDepartment(department).subscribe({
      next: (response) => {
        console.log(response);
        this.getDepartments();
      },
      error: (error: HttpErrorResponse) => console.log(error),
      complete: () => {}
    });
  }

  public onDeleteDepartment(departmentId: number): void {
    document.getElementById('close-delete-modal').click();
    this.departmentService.deleteDepartment(departmentId).subscribe({
      next: (response) => {
        console.log(response);
        this.getDepartments();
      },
      error: (error: HttpErrorResponse) => console.log(error),
      complete: () => {}
    });
  }


  public onOpenModal(department: Department, type: String): void  {
    if (type === "update") {
      this.editDepartment = department;
    } else if (type === "delete") {
      this.deleteDepartment = department;
    }
  }

  public passDeptInfo(department: Department): void {
    this.departmentId = department.id;
    // this.employeeComponent.getEmployees(department.id)
    this.employees = department.employees
  }

  public onUpdateEm(employee: Employee): void {
    this.edit = true;
    console.log("here")
    console.log(this.edit)
    console.log(employee)
    console.log(this.departmentId)
    const btn = document.getElementById(`${this.departmentId}-AddNewBtn`)
    this.employeeFormComponent.employee = employee
  }

  public onFormSubmit(department: Department, addForm: NgForm): void {
    this.employeeComponent.onAddEmloyee(department.id, addForm);
    document.getElementById(`${department.name}-close`).click();
    
  }

  public onModalClose(): void {
    this.getDepartments();
  }
}

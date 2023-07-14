import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'employee-container',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() departmentId = 0;
  @Input() employees: Employee[] = [];
  @Output() updateEvent = new EventEmitter<Employee>()

  // public employees: Employee[] = [];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService ) {}


  public getEmployees(deptId: number): void {
    console.log(deptId);
    this.employeeService.getEmployees(deptId).subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        console.log(response);
        console.log(this.employees);
      },
      error: (error: HttpErrorResponse) => console.log(error),
      complete: () => {}
    });
  }

  public onAddEmloyee(deptId: number, addForm: NgForm): void {
    this.employeeService.addEmployee(deptId, addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.employees.push(response)
        // this.getEmployees(deptId);
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        addForm.reset();
      },
      complete: () => {}
    });
  }

  public onUpdateClick(employee: Employee): void {
    console.log(employee)
    this.updateEvent.emit(employee);
  }

  public onDeleteClick(employee: Employee): void {
    console.log(employee)
  }

  public onUpdateEmloyee(deptId: number, form: NgForm): void {
    console.log(form.value)
    // this.employeeService.updateEmployee(employee).subscribe(
    //   (response: Employee) => {
    //     console.log(response);
    //     this.getEmployees();
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.message)
    //   }
    // );
  }

  // public onDeleteEmloyee(employeeId: number): void {
  //   this.employeeService.deleteEmployee(employeeId).subscribe(
  //     (response: void) => {
  //       console.log(response);
  //       this.getEmployees();
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message)
  //     }
  //   );
  // }

  // public searchEmployees(key: string): void {
  //   const results: Employee[] = [];
  //   for (const employee of this.employees) {
  //     if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(employee);
  //     }
  //   }
  //   this.employees = results;

  //   if (results.length === 9 || !key) {
  //     this.getEmployees();
  //   }
  // }

}
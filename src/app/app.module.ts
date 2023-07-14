import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DepartmentService } from './components/department/department.service';
import { EmployeeService } from './components/employee/employee.service';

@NgModule({
  declarations: [AppComponent, DepartmentComponent, EmployeeComponent, EmployeeFormComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule, BrowserAnimationsModule],
  providers: [DepartmentService, EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

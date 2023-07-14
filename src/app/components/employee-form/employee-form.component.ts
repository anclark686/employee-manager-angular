import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../employee/employee'

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  @Input() employee?: Employee;
  @Output() newFormEvent = new EventEmitter<NgForm>()

  constructor() {}

  public onSubmit(form: NgForm): void {
    this.newFormEvent.emit(form);
  }
}

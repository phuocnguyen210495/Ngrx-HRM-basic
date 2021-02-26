import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Store } from '@ngrx/store';
import * as employeeActions from 'src/app/store/employees/employees.actions';
import * as fromEmployee from '../../store/employees/employees.reducer';
import { Employee } from 'src/app/models/employee.model';
import { skills } from './skills';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  public employeeForm: FormGroup;
  _skills = skills;
  constructor(
    public empService: EmployeeService,
    public router: Router,
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private store: Store<fromEmployee.AppState>
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      date: [null, Validators.required],
      number: [null, Validators.required],
      skills: [null, Validators.required],
      skill_Percent: [null, Validators.required],
      image: [null, Validators.required],
    });
  }
  /* dùng service */
  // addEmployee() {
  //   this.empService
  //     .createEmployee(this.employeeForm.value)
  //     .subscribe((data: {}) => {
  //       // this.router.navigate(['/employee-list']);
  //       this.drawerRef.close();
  //       location.reload();
  //     });
  // }

  /* Dùng Ngrx */
  addEmployee() {
    const newEmployee: Employee = {
      name: this.employeeForm.get('name').value,
      email: this.employeeForm.get('email').value,
      date: this.employeeForm.get('date').value,
      number: this.employeeForm.get('number').value,
      skills: this.employeeForm.get('skills').value,
      skill_Percent: this.employeeForm.get('skill_Percent').value,
      image: this.employeeForm.get('image').value,
    };
    this.store.dispatch(new employeeActions.CreateEmployee(newEmployee));
    this.drawerRef.close();
    // location.reload();
  }
  close(): void {
    this.drawerRef.close();
  }
}

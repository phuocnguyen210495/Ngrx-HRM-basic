import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Employee } from 'src/app/models/employee.model';

export enum EmployeeActionTypes {
  LOAD_EMPLOYEES = '[Employee] Load Employees',
  LOAD_EMPLOYEES_SUCCESS = '[Employee] Load Employees Success',
  LOAD_EMPLOYEES_FAIL = '[Employee] Load Employees Fail',
  LOAD_EMPLOYEE = '[Employee] Load Employee',
  LOAD_EMPLOYEE_SUCCESS = '[Employee] Load Employee Success',
  LOAD_EMPLOYEE_FAIL = '[Employee] Load Employee Fail',
  CREATE_EMPLOYEE = '[Employee] Create Employee',
  CREATE_EMPLOYEE_SUCCESS = '[Employee] Create Employee Success',
  CREATE_EMPLOYEE_FAIL = '[Employee] Create Employee Fail',
  UPDATE_EMPLOYEE = '[Employee] Update Employee',
  UPDATE_EMPLOYEE_SUCCESS = '[Employee] Update Employee Success',
  UPDATE_EMPLOYEE_FAIL = '[Employee] Update Employee Fail',
  DELETE_EMPLOYEE = '[Employee] Delete Employee',
  DELETE_EMPLOYEE_SUCCESS = '[Employee] Delete Employee Success',
  DELETE_EMPLOYEE_FAIL = '[Employee] Delete Employee Fail',
}

export class LoadEmployees implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES;
}
export class LoadEmployeesSuccess implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS;
  constructor(public payload: Employee[]) {}
}
export class LoadEmployeesFail implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES_FAIL;
  constructor(public payload: string) {}
}
export class LoadEmployee implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEE;
  constructor(public payload: number) {}
}
export class LoadEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEE_SUCCESS;
  constructor(public payload: Employee) {}
}
export class LoadEmployeeFail implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEE_FAIL;
  constructor(public payload: string) {}
}
export class CreateEmployee implements Action {
  readonly type = EmployeeActionTypes.CREATE_EMPLOYEE;
  constructor(public payload: Employee) {}
}
export class CreateEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.CREATE_EMPLOYEE_SUCCESS;
  constructor(public payload: Employee) {}
}
export class CreateEmployeeFail implements Action {
  readonly type = EmployeeActionTypes.CREATE_EMPLOYEE_FAIL;
  constructor(public payload: string) {}
}
export class UpdateEmployee implements Action {
  readonly type = EmployeeActionTypes.UPDATE_EMPLOYEE;
  constructor(public payload: Employee) {}
}
export class UpdateEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.UPDATE_EMPLOYEE_SUCCESS;
  constructor(public payload: Update<Employee>) {}
}
export class UpdateEmployeeFail implements Action {
  readonly type = EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL;
  constructor(public payload: string) {}
}
export class DeleteEmployee implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEE;
  constructor(public payload: number) {}
}
export class DeleteEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS;
  constructor(public payload: number) {}
}
export class DeleteEmployeeFail implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEE_FAIL;
  constructor(public payload: string) {}
}
export type EmployeeAction =
  | LoadEmployees
  | LoadEmployeesSuccess
  | LoadEmployeeSuccess
  | LoadEmployeesFail
  | CreateEmployee
  | CreateEmployeeSuccess
  | CreateEmployeeFail
  | UpdateEmployee
  | UpdateEmployeeSuccess
  | UpdateEmployeeFail
  | DeleteEmployee
  | DeleteEmployeeSuccess
  | DeleteEmployeeFail;

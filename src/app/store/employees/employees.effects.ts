import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { EmployeeService } from 'src/app/services/employee.service';
import * as employeeActions from './employees.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class EmployeesEffects {
  id = this.actRoute.snapshot.params['id'];
  constructor(
    private actions$: Actions,
    private service: EmployeeService,
    private actRoute: ActivatedRoute
  ) {}
  @Effect()
  loadEmployees$: Observable<Action> = this.actions$.pipe(
    ofType<employeeActions.LoadEmployees>(
      employeeActions.EmployeeActionTypes.LOAD_EMPLOYEES
    ),
    mergeMap((action: employeeActions.LoadEmployees) =>
      this.service.getEmployees().pipe(
        map(
          (employees: Employee[]) =>
            new employeeActions.LoadEmployeesSuccess(employees)
        ),
        catchError((err) => of(new employeeActions.LoadEmployeesFail(err)))
      )
    )
  );
  @Effect()
  loadEmployee$: Observable<Action> = this.actions$.pipe(
    ofType<employeeActions.LoadEmployee>(
      employeeActions.EmployeeActionTypes.LOAD_EMPLOYEE
    ),
    mergeMap((action: employeeActions.LoadEmployee) =>
      this.service.getEmployee(action.payload).pipe(
        map(
          (employee: Employee) =>
            new employeeActions.LoadEmployeeSuccess(employee)
        ),
        catchError((err) => of(new employeeActions.LoadEmployeeFail(err)))
      )
    )
  );

  @Effect()
  createEmployee$: Observable<Action> = this.actions$.pipe(
    ofType<employeeActions.CreateEmployee>(
      employeeActions.EmployeeActionTypes.CREATE_EMPLOYEE
    ),
    map((action: employeeActions.CreateEmployee) => action.payload),
    mergeMap((employee: Employee) =>
      this.service.createEmployee(employee).pipe(
        map(
          (newEmployee: Employee) =>
            new employeeActions.CreateEmployeeSuccess(newEmployee)
        ),
        catchError((err) => of(new employeeActions.CreateEmployeeFail(err)))
      )
    )
  );

  @Effect()
  updateEmployee$: Observable<Action> = this.actions$.pipe(
    ofType<employeeActions.UpdateEmployee>(
      employeeActions.EmployeeActionTypes.UPDATE_EMPLOYEE
    ),
    map((action: employeeActions.UpdateEmployee) => action.payload),
    mergeMap((employee: Employee) =>
      this.service.updateEmployee(employee.id, employee).pipe(
        map(
          (updateEmployee: Employee) =>
            new employeeActions.UpdateEmployeeSuccess({
              id: updateEmployee.id,
              changes: updateEmployee,
            })
        ),
        catchError((err) => of(new employeeActions.UpdateEmployeeFail(err)))
      )
    )
  );
  @Effect()
  deleteEmployee$: Observable<Action> = this.actions$.pipe(
    ofType<employeeActions.DeleteEmployee>(
      employeeActions.EmployeeActionTypes.DELETE_EMPLOYEE
    ),
    map((action: employeeActions.DeleteEmployee) => action.payload),
    mergeMap((id: number) =>
      this.service.deleteEmployee(id).pipe(
        map(() => new employeeActions.DeleteEmployeeSuccess(id)),
        catchError((err) => of(new employeeActions.DeleteEmployeeFail(err)))
      )
    )
  );
}

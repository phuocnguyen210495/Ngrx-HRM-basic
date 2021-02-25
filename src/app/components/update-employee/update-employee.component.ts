import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import * as employeeActions from 'src/app/store/employees/employees.actions';
import * as fromEmployee from '../../store/employees/employees.reducer';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  updateForm: FormGroup;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private store: Store<fromEmployee.AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.updateForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      date: new FormControl(),
      number: new FormControl(),
      skills: new FormControl(),
      id: new FormControl(),
    });
  }

  ngOnInit() {
    // this.service.getEmployee(this.id).subscribe(employee => {
    //   this.updateForm.controls['name'].setValue(employee.name);
    //   this.updateForm.controls['email'].setValue(employee.email);
    //   this.updateForm.controls['date'].setValue(employee.date);
    //   this.updateForm.controls['number'].setValue(employee.number);
    //   this.updateForm.controls['skills'].setValue(employee.skills);
    // });
    // this.store.dispatch(new employeeActions.LoadEmployee(Employee.id));
    const employee$: Observable<Employee> = this.store.select(
      fromEmployee.getCurrentEmployee
    );
    employee$.subscribe((currentEmployee) => {
      if (currentEmployee) {
        this.updateForm.patchValue({
          name: currentEmployee.name,
          email: currentEmployee.email,
          date: currentEmployee.date,
          number: currentEmployee.number,
          skills: currentEmployee.skills,
          id: currentEmployee.id,
        });
      }
    });
  }

  updateEmployee() {
    // debugger;
    // this.service
    //   .updateEmployee(this.id, this.updateForm.value)
    //   .subscribe((data) => {
    //     this.router.navigate(['/employee-list']);
    //   });
    const updatedEmployee: Employee = {
      name: this.updateForm.get('name').value,
      email: this.updateForm.get('email').value,
      date: this.updateForm.get('date').value,
      number: this.updateForm.get('number').value,
      skills: this.updateForm.get('skills').value,
      id: this.updateForm.get('id').value,
    };
    console.log(updatedEmployee);
    this.store.dispatch(new employeeActions.UpdateEmployee(updatedEmployee));
    this.router.navigate(['/employee-list']);
  }
}

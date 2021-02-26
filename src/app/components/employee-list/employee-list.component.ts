import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as employeeActions from 'src/app/store/employees/employees.actions';
// import * as fromEmployee from 'src/app/store/employees/employees.reducer'
import * as fromEmployee from '../../store/employees/employees.reducer';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];
  employees$: Observable<Employee[]>;
  error$: Observable<String>;
  pageSize = 5;
  pageIndex = 1;
  loading = true;
  total = 1;
  sortName = null;
  sortValue = null;

  constructor(
    public service: EmployeeService,
    public router: Router,
    private drawerService: NzDrawerService,
    private store: Store<fromEmployee.AppState> // public modal: NgbModal
  ) {}

  ngOnInit() {
    // debugger;
    this.store.dispatch(new employeeActions.LoadEmployees());
    this.employees$ = this.store.pipe(select(fromEmployee.getEmployees));
    this.error$ = this.store.pipe(select(fromEmployee.getError));
    setTimeout(() => {
      this.pageSize;
      this.pageIndex;
      this.loading = false;
    }, 3000);
    // console.log(this.employees$, this.error$);
    // this.loadEmployees();
  }
  // onQueryParamsChange(params: NzTableQueryParams): void {
  //     console.log(params);
  //     const { pageSize, pageIndex, sort, filter } = params;
  //     const currentSort = sort.find(item => item.value !== null);
  //     const sortField = (currentSort && currentSort.key) || null;
  //     const sortOrder = (currentSort && currentSort.value) || null;
  //     this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  //   }
  loadEmployees() {
    return this.service.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  // editEmployee(id) {
  //   this.store.dispatch(new employeeActions.LoadEmployee(id));
  //   this.router.navigate(['/update-employee', id]);
  // }

  add() {
    const drawerRef = this.drawerService.create<CreateEmployeeComponent>({
      nzTitle: 'Thêm mới nhân viên',
      nzWidth: '480px',
      nzContent: CreateEmployeeComponent,
    });
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });
    drawerRef.afterClose.subscribe((data) => {
      console.log(data);
      // this.router.navigate(['/employee-list']);
    });
  }
  update(id) {
    const drawerRef = this.drawerService.create<UpdateEmployeeComponent>({
      nzTitle: 'Cập nhật nhân viên',
      nzWidth: '480px',
      nzContent: UpdateEmployeeComponent,
    });
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
      this.store.dispatch(new employeeActions.LoadEmployee(id));
    });
    drawerRef.afterClose.subscribe((data) => {
      console.log(data);
    });
  }
  deleteEmployee(id) {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      this.store.dispatch(new employeeActions.DeleteEmployee(id));
    }
  }
  // deleteEmployee(id) {
  //   if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
  //     this.service.deleteEmployee(id).subscribe((data) => {
  //       this.loadEmployees();
  //     });
  //   }
  // }
}

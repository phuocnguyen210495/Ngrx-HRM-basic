import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, Actions } from '@ngrx/effects';
import { EmployeesEffects } from './store/employees/employees.effects';
import { employeeReducer } from './store/employees/employees.reducer';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    NzIconModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('employees', employeeReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([EmployeesEffects]),
    NzDrawerModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}

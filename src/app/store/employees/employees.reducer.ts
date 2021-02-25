import * as employeeActions from './employees.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Employee } from 'src/app/models/employee.model';
import * as fromRoot from '../../state/app-state';

export interface State extends EntityState<Employee> {
  selectedEmployeeId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}
export interface AppState extends fromRoot.AppState {
  employees: State;
}
export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();
export const defaultEmployee: State = {
  ids: [],
  entities: {},
  selectedEmployeeId: null,
  loading: false,
  loaded: false,
  error: '',
};
export const initialState = employeeAdapter.getInitialState(defaultEmployee);
export function employeeReducer(
  state: State = initialState,
  action: employeeActions.EmployeeAction
) {
  switch (action.type) {
    case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS: {
      return employeeAdapter.setAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loader: false,
        error: action.payload,
      };
    }

    case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEE_SUCCESS: {
      return employeeAdapter.addOne(action.payload, {
        ...state,
        selectedEmployeeId: action.payload.id,
      });
    }
    case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case employeeActions.EmployeeActionTypes.CREATE_EMPLOYEE_SUCCESS: {
      return employeeAdapter.addOne(action.payload, state);
    }
    case employeeActions.EmployeeActionTypes.CREATE_EMPLOYEE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case employeeActions.EmployeeActionTypes.UPDATE_EMPLOYEE_SUCCESS: {
      return employeeAdapter.updateOne(action.payload, state);
    }
    case employeeActions.EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case employeeActions.EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS: {
      return employeeAdapter.removeOne(action.payload, state);
    }
    case employeeActions.EmployeeActionTypes.DELETE_EMPLOYEE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
}
/* selectors.ts */
export const getEmployeeFeatureState = createFeatureSelector<State>(
  'employees'
);
export const getEmployees = createSelector(
  getEmployeeFeatureState,
  employeeAdapter.getSelectors().selectAll
);
export const getEmployeesLoading = createSelector(
  getEmployeeFeatureState,
  (state: State) => state.loading
);
export const getEmployeesLoaded = createSelector(
  getEmployeeFeatureState,
  (state: State) => state.loaded
);
export const getError = createSelector(
  getEmployeeFeatureState,
  (state: State) => state.error
);
export const getCurrentEmployeeId = createSelector(
  getEmployeeFeatureState,
  (state: State) => state.selectedEmployeeId
);
export const getCurrentEmployee = createSelector(
  getEmployeeFeatureState,
  getCurrentEmployeeId,
  (state) => state.entities[state.selectedEmployeeId]
);

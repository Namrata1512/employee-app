import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  employeesRef: AngularFireList<any>;
  employeeRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

  CreateEmployeesList() {
    this.db.object('employees-list').set({});
  }
  // Create Employee
  AddEmployee(employee: Employee) {
    const employeeData = Object.assign(
      {},
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
        joiningDate: new Date(employee.joiningDate).getTime(),
        relievingDate: new Date(employee.relievingDate).getTime(),
      }
    );
    console.log(employee, employeeData)
    this.employeesRef.push(employeeData);
  }
  // Fetch Single Employee Object
  GetEmployee(id: string): Promise<Employee> {
    const employeeRef = this.db.database.ref(`employees-list/${id}`);
    return employeeRef.once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val() as Employee;
        } else {
          throw new Error(`Employee with id ${id} not found.`);
        }
      });
  }
  // Fetch Employees List
  GetEmployeesList() {
    this.employeesRef = this.db.list('employees-list');
    return this.employeesRef;
  }
  // Update Employee Object
  UpdateEmployee(employee: Employee, id: any) {
    if (id) {
      this.employeeRef = this.db.object(`employees-list/${id}`);
      this.employeeRef.update({
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
        joiningDate: employee.joiningDate,
        relievingDate: employee.relievingDate,
      });
    } else {
      console.error("Employee ID is not provided.");
    }
  }

  // Delete Employee Object
  DeleteEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    this.employeeRef.remove();
  }
}
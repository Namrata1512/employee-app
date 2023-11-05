import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  public employeeForm: FormGroup;
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default' });
  }
  ngOnInit() {
    this.crudApi.GetEmployeesList();
    this.EmployeeForm();
  }

  EmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      joiningDate: ['', Validators.required],
      relievingDate: [null],
    });
  }
  get firstName() {
    return this.employeeForm.get('firstName');
  }
  get lastName() {
    return this.employeeForm.get('lastName');
  }
  get role() {
    return this.employeeForm.get('role');
  }
  get joiningDate() {
    return this.employeeForm.get('joiningDate');
  }
  get relievingDate() {
    return this.employeeForm.get('relievingDate');
  }

  ResetForm() {
    this.employeeForm.reset();
  }
  submitEmployeeData() {
    this.crudApi.AddEmployee(this.employeeForm.value);
    this.toastr.success(
      this.employeeForm.controls['firstName'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}
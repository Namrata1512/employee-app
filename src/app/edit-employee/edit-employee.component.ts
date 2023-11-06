import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(private crudApi: CrudService, private fb: FormBuilder,
    private location: Location, private actRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }
  ngOnInit() {
    this.updateEmployeeData();
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetEmployee(this.id).then((data) => {
      let firstName, lastName, role;
      firstName = data.firstName;
      lastName = data.lastName;
      role = data.role;
      const joiningDate = new Date(data.joiningDate);
      let relievingDate = null;
      if (!data.relievingDate) { }
      else relievingDate = new Date(data.relievingDate);
      this.editForm.setValue({
        firstName,
        lastName,
        role,
        joiningDate,
        relievingDate
      });
    });
  }
  get firstName() {
    return this.editForm.get('firstName');
  }
  get lastName() {
    return this.editForm.get('lastName');
  }
  get role() {
    return this.editForm.get('role');
  }
  get joiningDate() {
    return this.editForm.get('joiningDate');
  }
  get relievingDate() {
    return this.editForm.get('relievingDate');
  }
  updateEmployeeData() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      joiningDate: ['', Validators.required],
      relievingDate: [null],
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    // this.crudApi.CreateEmployeesList();
    this.crudApi.UpdateEmployee(this.editForm.value, this.id);
    this.toastr.success(
      this.editForm.controls['firstName'].value + ' updated successfully'
    );
    this.router.navigate(['view-employees']);
  }
}
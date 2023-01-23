import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from './../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    let element: HTMLElement = document.getElementById('reset-btn') as HTMLElement;
    element.click();
    this.refreshEmpList();

  }

  //form? ===> Nullable (in Somecases we cannot pass value for "form" parameter)
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        office: "",
        salary: null
      }
    }
  }

  OnSubmit(form: NgForm) {
    console.log("ID = == == == =" + form.value._id);
    if (!form.value._id) {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        M.toast({ html: 'The New Employee Was Added Successfully !', inDuration: 500, classes: 'green accent-3 black-text rounded' });
        this.resetForm(form);
        this.refreshEmpList();
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        M.toast({ html: 'Employee\'s Informations Were Updated Successfully !', inDuration: 500, classes: 'yellow accent-3 black-text rounded' });
        this.resetForm(form);
        this.refreshEmpList();
      });
    }
  }

  refreshEmpList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employeesArray = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are You Sure ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        M.toast({ html: 'Employee Was Deleted Successfully !', inDuration: 500, classes: 'red accent-3 white-text rounded' });
        this.resetForm(form);
        this.refreshEmpList();
      });
    };
  }

}

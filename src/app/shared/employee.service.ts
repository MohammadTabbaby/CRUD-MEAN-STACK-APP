import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee!: Employee;
  employeesArray!: Employee[];
  readonly BaseURL = 'http://127.0.0.1:3000/employees';

  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.BaseURL, emp);
  }
  getEmployeeList() {
    return this.http.get(this.BaseURL);
  }
  putEmployee(emp: Employee) {
    return this.http.put(this.BaseURL + `/${emp._id}`, emp);
  }
  deleteEmployee(_id: string) {
    return this.http.delete(this.BaseURL + `/${_id}`);
  }

}

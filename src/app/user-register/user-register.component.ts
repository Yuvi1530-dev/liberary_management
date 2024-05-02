import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm !: FormGroup;
  formSubmit: boolean = false;
  userMange: any = [];
  constructor(public fb: FormBuilder, private service: CommonService) {
    this.userRegisterForm = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userRole: ['', [Validators.required]]
    })
  }
  ngOnInit(): void { }
  get valid(): { [key: string]: AbstractControl } {
    return this.userRegisterForm.controls;
  }
  registerHandler() {
    let loginDetails = Object.assign(this.userRegisterForm.value, {});
    this.formSubmit = true;
    let requestdata;
    if (this.userRegisterForm.valid) {
      let userDetails = JSON.parse(localStorage.getItem("user_create_details") || "[]");
      let user_id = userDetails.length != 0 ? userDetails[userDetails.length - 1]['id'] + 1 : 1;
      let userIndex = userDetails.findIndex((data: any) => data.user_name == loginDetails.user_name);

      if (userIndex != -1) {
        this.service.failureAlert("User Already Exist")
      } else {
        this.userMange = userDetails;
        this.userMange.push({
          "id": user_id,
          "user_name": loginDetails.user_name,
          "password": loginDetails.password,
          "user_role": loginDetails.userRole,
          "n_status": 1
        });
        if (userDetails.length == 1) {
          loginDetails.userRole == "1" ? '' : this.userMange[0]['total_borrowed'] = 0;
        } else {
          loginDetails.userRole == "1" ? '' : this.userMange[this.userMange.length - 1]['total_borrowed'] = 0;
        }
        localStorage.setItem("user_create_details", JSON.stringify(this.userMange));
        this.service.sucessAlert("Success", `User Added Successfully`, 'success', false, 'Okay', '');
      }
 
    }
  }
}

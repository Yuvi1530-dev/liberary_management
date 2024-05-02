import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  formSubmit: boolean = false;

  constructor(public fb: FormBuilder, private service: CommonService, private route: Router) {
    this.loginForm = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  loginHandler() {
    this.formSubmit = true;
    if (this.loginForm.valid) {
      let loginDetails = Object.assign(this.loginForm.value, {});
      const userDetails = JSON.parse(localStorage.getItem('user_create_details') || '[]');
      let userIndex = userDetails.findIndex((data : any)=>data.user_name==loginDetails.user_name);
      let userPassword = userDetails.findIndex((item : any)=>item.password==loginDetails.password);

console.log(userDetails[userIndex],"userIndex")
      if(userDetails[userIndex] && userDetails[userIndex].user_name==loginDetails.user_name&&userDetails[userIndex].password==loginDetails.password ){
        this.service.sucessAlert("Success", `User Login Successfully`, 'success', false, 'Okay', '');
              sessionStorage.setItem('login_details', JSON.stringify(userDetails[userIndex]));
              if(userDetails[userIndex].user_role==1){
                this.route.navigate(['user_list'])
              }else{
                this.route.navigate(['book_list'])
              }
      }else{
        this.service.failureAlert("User Not Found")
      }
      // userDetails.map((data: any) => {
      //   if (loginDetails.user_name == data.user_name) {
      //     if (loginDetails.password == data.password) {  
      //       this.service.sucessAlert("Success", `User Login Successfully`, 'success', false, 'Okay', '');
      //       sessionStorage.setItem('login_details', JSON.stringify(data));
      //       if(data.user_role==1){
      //         this.route.navigate(['user_list'])
      //       }else{
      //         this.route.navigate(['book_list'])
      //       }
      //       return;
      //     } else {
      //       this.service.failureAlert("Incorrect Password")
      //     }
      //   } else {
      //     this.service.failureAlert("User Not Found")
      //   }
      // })
    }
  }
}

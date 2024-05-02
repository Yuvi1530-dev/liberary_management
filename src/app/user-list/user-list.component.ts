import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(private service: CommonService, private route: Router) {

  }
  user_list: any = []
  ngOnInit(): void {
    let userList = JSON.parse(localStorage.getItem('user_create_details') || '[]');
    userList.forEach((data: any, index: any) => {
      if (data.user_role != 1) {
        this.user_list.push(data);
      }
    })
  }
  confirMation(id: any,type: any) {
    let title =''
    if(type==1){
      title ="In active"
    }else{
      title ="active"
    }
    this.service.sucessAlert("", `Are Sure You want ${title} this user`, 'info', true, 'Okay', 'Cancel').then((data: any) => {
      if (data.isConfirmed == true) {
        let details = JSON.parse(localStorage.getItem('user_create_details') || '[]')
        let findIndex = details.findIndex((res: any) => res.id == id)
        if(type==1){
          details[findIndex]['n_status']=2;
        }else{
          details[findIndex]['n_status']=1;
        }
        localStorage.removeItem('user_create_details');
        localStorage.setItem('user_create_details',JSON.stringify(details));
        this.service.sucessAlert("", `User Details Updated Successfullys`, 'info', true, 'Okay', 'Cancel').then((data: any) => {
          if(data.isConfirmed==true){
            location.reload()
          }
         })
      }
    });
  }
}

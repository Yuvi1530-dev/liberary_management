import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private route :  Router){

  }
  userType : any;
  isAuth : boolean =false;
  ngOnInit(): void {
  if(sessionStorage.getItem('login_details')){
    let userDetails = JSON.parse(sessionStorage.getItem('login_details') || '[]');
    this.userType = userDetails.user_role=='1' ? 'Admin' : 'User'
    this.isAuth=true;
  }
  }
  logout(){
    sessionStorage.clear();
    this.route.navigate([''])
    
  }
}

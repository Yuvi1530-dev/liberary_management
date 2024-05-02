import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginComponent } from './login/login.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookReadComponent } from './book-read/book-read.component';
import { CombineComponent } from './_layout/combine/combine.component';
import { UserListComponent } from './user-list/user-list.component';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';

const routes: Routes = [{
  path: 'register',
  component: UserRegisterComponent
},
{
  path: '',
  component: LoginComponent
}, {
  path: '',
  component :CombineComponent ,
  children: [
    {
      path: 'book-add',
      component: BookAddComponent
    }
  ]
}, {
  path: '',
  component :CombineComponent,
  children: [
    {
      path: 'book_edit/:id',
      component: BookEditComponent
    }
  ]
}, {
  path: '',
  component :CombineComponent ,
  children: [
    {
      path: 'book_list',
      component: BookListComponent
    }
  ]
}, {
  path: '',
  component :CombineComponent ,
  children: [
    {
      path: 'book_read/:id',
      component: BookReadComponent
    }
  ]
},
{
  path: '',
  component :CombineComponent ,
  canActivate: [],
  children: [
    {
      path: 'user_list',
      component: UserListComponent
    }
  ]
},{
  path: '',
  component :CombineComponent ,
  canActivate: [],
  children: [
    {
      path: 'borrowed_list',
      component: BorrowedListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginComponent } from './login/login.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookReadComponent } from './book-read/book-read.component';
import { UserListComponent } from './user-list/user-list.component';
import { HeaderComponent } from './_layout/header/header.component';
import { CombineComponent } from './_layout/combine/combine.component';
import { RouterModule } from "@angular/router";
import { CommonService } from './service/common.service';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginComponent,
    BookAddComponent,
    BookEditComponent,
    BookListComponent,
    BookReadComponent,
    UserListComponent,
    HeaderComponent,
    CombineComponent,
    BorrowedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

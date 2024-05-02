import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  BookDetails: any = []
  message: string = '';
  display: any = 'none';
  isbn: Number = 0;
  userType: any;
  user_id: any;
  // BookList
  constructor(private route: Router, private service: CommonService) { }
  ngOnInit(): void {
    this.getBookList();
    if (sessionStorage.getItem('login_details')) {
      let userDetails = JSON.parse(sessionStorage.getItem('login_details') || '[]');
      this.userType = userDetails.user_role == '1' ? 'Admin' : 'User';
      this.user_id = userDetails.id
    }
  }

  bookEdit = (id: number) => {
    this.route.navigate([`book_edit/${id}`])
  }
  bookReadDescribtion = (id: number) => {
    this.route.navigate([`book_description/${id}`])
  }
  getBookList() {
    if (localStorage.getItem('book_list')) {
      this.BookDetails = JSON.parse(localStorage.getItem('book_list') || '[]')
    }
  }
  deleteBook(id: any, type: any) {
    let title = ''
    if (type == 1) {
      title = "In active"
    } else {
      title = "Active"
    }
    this.service.sucessAlert("", `Are Sure You want ${title} this book`, 'info', true, 'Okay', 'Cancel').then((data: any) => {
      if (data.isConfirmed == true) {
        let details = JSON.parse(localStorage.getItem('book_list') || '[]')
        let findIndex = details.findIndex((res: any) => res.id == id)
        if (type == 1) {
          details[findIndex]['n_status'] = 2;
        } else {
          details[findIndex]['n_status'] = 1;
        }
        localStorage.removeItem('book_list');
        localStorage.setItem('book_list', JSON.stringify(details));
        this.service.sucessAlert("", `Book Details Updated Successfullys`, 'info', true, 'Okay', 'Cancel').then((data: any) => {
          if (data.isConfirmed == true) {
            location.reload()
          }
        })
      }
    });
  }
  borrowBook(id: any) {
    this.BookDetails = JSON.parse(localStorage.getItem('book_list') || '[]');
    let index = this.BookDetails.findIndex((data: any) => data.id == id);
    let user_Id = [];
    user_Id.push(this.user_id)
    let userDetails = JSON.parse(sessionStorage.getItem('login_details') || '[]');
    let whole_list = JSON.parse(localStorage.getItem('user_create_details') || '[]');
    let user_index = whole_list.findIndex((item: any) => item.id == userDetails.id)
    let bk_id = [];
    let book_id = []
    book_id.push(id);
    console.log(userDetails.hasOwnProperty('borrowed_book_id'), "userDetails['borrowed_book_id']")
    if (userDetails.hasOwnProperty('borrowed_book_id')==false) {
      bk_id.push(id);
    } else {
      bk_id = userDetails['borrowed_book_id'].split(",");
      bk_id.push(id);
    }
    if (userDetails['total_borrowed']==0) {
      whole_list[user_index]['total_borrowed']=1
      userDetails['total_borrowed']=1
    } else {
      whole_list[user_index]['total_borrowed']= whole_list[user_index]['total_borrowed']+1
      userDetails['total_borrowed']=userDetails['total_borrowed']+1
    }
    userDetails['borrowed_book_id'] = bk_id.join(',');
    whole_list[user_index]['borrowed_book_id'] = bk_id.join(',');
    sessionStorage.removeItem('login_details');
    sessionStorage.setItem('login_details', JSON.stringify(userDetails));
    localStorage.removeItem('user_create_details');
    localStorage.setItem('user_create_details', JSON.stringify(whole_list))
    this.BookDetails[index]['user_id_borrowed'] = user_Id.join(",");
    this.BookDetails[index]['borrowed_status'] = this.BookDetails[index]['borrowed_status'] == 0 ? 1 : 0
    this.BookDetails[index]['total_borrowed_by'] = this.BookDetails[index]['total_borrowed_by'] == 0 ? 1 : this.BookDetails[index]['total_borrowed_by'] + 1
    localStorage.removeItem('book_list');
    localStorage.setItem('book_list', JSON.stringify(this.BookDetails));
  }
  returnBook(id: any) {
    let userDetails = JSON.parse(sessionStorage.getItem('login_details') || '[]');
    let whole_list = JSON.parse(localStorage.getItem('user_create_details') || '[]');
    let user_index = whole_list.findIndex((item: any) => item.id == userDetails.id)
    let user_login_detail = userDetails['borrowed_book_id'].split(',')
    let book_index = user_login_detail.findIndex((item: any) => item == id);
    let whole_session_book_id = whole_list[user_index]['borrowed_book_id'].split(',')
    user_login_detail.splice(book_index, 1)
    whole_session_book_id.splice(book_index, 1)
    whole_list[user_index]['borrowed_book_id'] = whole_session_book_id.join(',')
    userDetails['borrowed_book_id'] = user_login_detail.join(',');
    sessionStorage.removeItem('login_details');
    localStorage.removeItem('user_create_details');
    sessionStorage.setItem('login_details', JSON.stringify(userDetails));
    localStorage.setItem('user_create_details', JSON.stringify(whole_list));
    //
    this.BookDetails = JSON.parse(localStorage.getItem('book_list') || '[]');
    let index = this.BookDetails.findIndex((data: any) => data.id == id);
    this.BookDetails[index]['user_id_borrowed'] = '';
    this.BookDetails[index]['borrowed_status'] = this.BookDetails[index]['borrowed_status'] == 0 ? 1 : 0
    localStorage.removeItem('book_list');
    localStorage.setItem('book_list', JSON.stringify(this.BookDetails));
  }
}

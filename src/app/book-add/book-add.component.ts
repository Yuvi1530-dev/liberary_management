import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookAddForm: FormGroup;
  formSubmit: boolean = false;
  book_Add  : any =[]
  constructor(private fb: FormBuilder, private service: CommonService, private route: Router) {
    this.bookAddForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(3)]],
      publication_year: ['', [Validators.required,Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(30)]]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bookAddForm.controls;
  }

  ngOnInit(): void { }

  creatBook = () => {
    this.formSubmit = true;
    let getFormValues = Object.assign({}, this.bookAddForm.value);
    if (this.bookAddForm.valid) {
      let book_list_count = JSON.parse(localStorage.getItem("book_list") || "[]");
      let book_id = book_list_count.length != 0 ? book_list_count[book_list_count.length - 1]['id'] + 1 : 1;
      this.book_Add=book_list_count;
      this.book_Add.push({
        "id": book_id,
        "title": getFormValues.title,
        "publication_year": getFormValues.publication_year,
        "description": getFormValues.description,
        "n_status": 1,
        "total_borrowed_by":0,
        "borrowed_status":0
      });
      localStorage.setItem("book_list", JSON.stringify(this.book_Add));
      this.service.sucessAlert("Success", `Book Added Successfully`,'success',false,'Okay','');
    }

  }
}


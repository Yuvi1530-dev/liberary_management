import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../service/common.service';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  formSubmit: boolean = false;
  bookList: any = [];
  bookEdit: any = [];
  successPopup: boolean = false;
  failurePopup: boolean = false;
  message: String = "";
  constructor(private fb: FormBuilder, private getData: ActivatedRoute, private route: Router,private service : CommonService) {
    this.bookEditForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      publication_year: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(30)]]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bookEditForm.controls;
  }

  ngOnInit(): void {
    let book_id = this.getData.snapshot.params['id']
    let findBook = JSON.parse(localStorage.getItem('book_list') || '[]');
    findBook.forEach((data: any, index: any) => {
      if (data.id == book_id) {
        this.bookList = data
      }
    });
  }

  creatBook = () => {
    this.formSubmit = true;
    let getFormValues = Object.assign({}, this.bookEditForm.value);
    let book_id = this.getData.snapshot.params['id']
    let payload = {
      title: getFormValues.title,
      publication_year: getFormValues.publication_year,
      isbn: this.getData.snapshot.params['id'],
      description: getFormValues.description
    };
    if (this.bookEditForm.valid) {
      let findBook = JSON.parse(localStorage.getItem('book_list') || '[]');
      let index = findBook.findIndex((data: any) => data.id == book_id);
      findBook[index]['title'] = getFormValues.title
      findBook[index]['publication_year'] = getFormValues.publication_year
      findBook[index]['description'] = getFormValues.description
      localStorage.removeItem('book_list');
      localStorage.setItem('book_list', JSON.stringify(findBook))
      this.service.sucessAlert("Success", `Book details Updated Successfully`, 'success', false, 'Okay', '').then((data:any)=>{
        if(data.isConfirmed==true){
          this.route.navigate(['book_list'])
        }
      });
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent  implements OnInit {
  bookRead: any = []
  constructor(private getData :ActivatedRoute,private route : Router) {

  }
  ngOnInit(): void {
    let urlData = this.getData.snapshot.params['id'];
    console.log(urlData,"urlData")
  }
}

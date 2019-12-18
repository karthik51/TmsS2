import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorID: string;
  errorDescription: string;

  constructor(    
    private route: ActivatedRoute
  ) {    
  }

  ngOnInit() {
    this.errorID = this.route.snapshot.params['id'];

    switch (this.errorID) {
      case "400":
        this.errorDescription = 'Bad Request. Please contact the administrator.';
        break;
      case "401":
        this.errorDescription = 'You are Unauthorized to view the page.';
        break;
      case "404":
        this.errorDescription = 'The requested resource was not found.';
        break;
      case "500":
        this.errorDescription = 'Internal Server Error. Please contact the administrator.';
        break;
    }
  }
}

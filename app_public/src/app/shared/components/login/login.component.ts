import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public pageContent = {
    header: {
      title: 'Sign in to Philson',
      strapline: ''
    },
    sidebar: ''
  }
  
  public credentials = {
    name: '',
    email: '',
    password: ''
  }

  public formErrors: string

  private formIsValid(): boolean {
    if (this.credentials.email && this.credentials.password) {
      return true
    } else {
      return false
    }
  }

  public onLoginSubmit(): void{
    this.formErrors = '';
    if (this.formIsValid()) {
      this.authenticationService.login(this.credentials)
        .then(()=> {
          this.router.navigateByUrl(this.historyService.getPreviousUrl())
        })
        .catch((message)=> this.formErrors = message)
    } else {
      this.formErrors = 'All fields required, please try again'
    }
  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private historyService: HistoryService) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public pageContent = {
    header: {
      title: 'Create a new account',
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
    if (this.credentials.name && this.credentials.email && this.credentials.password) {
      return true
    } else {
      return false
    }
  }

  public onRegisterSubmit(): void{
    this.formErrors = '';
    if (this.formIsValid()) {
      this.authenticationService.register(this.credentials)
        .then(()=> {
          this.router.navigateByUrl(this.historyService.getLastNonLoginUrl())
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

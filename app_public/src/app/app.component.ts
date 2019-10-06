import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { User } from './shared/types/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // @ViewChild(SideNavComponent, {static: true}) sideComponent: SideNavComponent
  
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}



  public doLogout(): void {
    this.authenticationService.logout()
  }

  public isLoggedIn(): boolean {
    const value = this.authenticationService.loggedIn()
    // console.log("Client -- isLoggedIn with " + value)
    return value
  }

  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser()
    // console.log("Client -- getUsername with " + user.name)
    return user ? user.name : 'Guest'
  }

  ngOnDestroy() {
    // this.categoriesSubscription.unsubscribe()
  }
}
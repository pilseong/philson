import { Injectable, Inject } from '@angular/core';
import { AccountManagerService } from './account-manager.service';
import { User } from '../types/user';
import { AuthResponse } from '../types/authresponse';
import { BROWSER_STORAGE } from '../types/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
              private loc8rDataService: AccountManagerService) { }

  public getToken(): string {
    const value = this.storage.getItem('loc8r-token')
    console.log("Client -- AuthenticationService getToken with " + value)    
    if (value === 'undefined') {
      console.log("value is undefined2: " + value)
    } else {
      return value
    }

  }

  public saveToken(token: string): void {
    console.log("Client -- AuthenticationService.saveToken with " + token)    
    this.storage.setItem('loc8r-token', token)
  } 

  public login(user: User): Promise<any> {
    console.log("Client -- AuthenticationService.login with " + user)
    return this.loc8rDataService.login(user)
      .then((authResp: AuthResponse)=> {
        console.log(authResp.token)
        this.saveToken(authResp.token)
      })
  }

  public register(user: User): Promise<any> {
    return this.loc8rDataService.register(user)
      .then((authResp: AuthResponse)=> {
      this.saveToken(authResp.token)
    })
  }

  public logout(): void {
    console.log("Client -- AuthenticationService.logout")
    this.storage.removeItem('loc8r-token')
  }

  public loggedIn(): boolean {
    console.log("Client -- AuthenticationService.loggedIn")
    const token = this.getToken()
    if (token && token !== undefined) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp > (Date.now() / 1000)
    } else {
      return false
    }
  }

  public getCurrentUser(): User {
    console.log("Client -- AuthenticationService.getCurrentUser")
    if (this.loggedIn()) {
      const token: string = this.getToken()
      const { email, name } = JSON.parse(atob(token.split('.')[1]))
      return { email, name } as User
    }
  }
}

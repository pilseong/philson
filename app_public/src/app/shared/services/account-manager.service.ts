import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';
import { User } from '../types/user';
import { AuthResponse } from '../types/authresponse';
import { BROWSER_STORAGE } from '../types/storage';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {
  private apiBaseUrl = environment.apiBaseUrl
  constructor(private http: HttpClient,
              @Inject(BROWSER_STORAGE) private storage: Storage) { }

  ngOnInit(): void {}

  public login(user: User): Promise<AuthResponse> {
    console.log("Client -- login with "+ JSON.stringify(user))
    return this.makeAuthApiCall('login', user)
  }

  public register(user: User): Promise<AuthResponse> {
    console.log("register -- register with "+ JSON.stringify(user))
    return this.makeAuthApiCall('register', user)
  }

  
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`
    return this.http.post(url, user)
      .toPromise()
      .then(response=> response as AuthResponse)
      .catch(this.handleError)
  }
  


  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error)
    return Promise.reject(error.message || error)
  }
}

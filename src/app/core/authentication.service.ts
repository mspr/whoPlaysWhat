import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class User
{
}

@Injectable()
export class AuthenticationService
{
  constructor(private httpClient : HttpClient)
  {
  }

  login(email : string, password : string)
  {
    return this.httpClient.post<User>(environment.baseUrl + '/login', {email, password}).shareReplay();
  }
}

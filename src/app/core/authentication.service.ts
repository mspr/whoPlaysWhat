import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";

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
    return this.httpClient.post<User>(environment.baseUrl + '/login', {email, password})
      .do(res => this.setSession)
      .shareReplay();
  }

  logout()
  {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  private setSession(authResult)
  {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public isLoggedIn()
  {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut()
  {
    return !this.isLoggedIn();
  }

  getExpiration()
  {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

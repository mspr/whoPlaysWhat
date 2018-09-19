import { AuthenticationService } from './../../core/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  public email : string;
  public password : string;

  constructor(private authenticationService : AuthenticationService)
  {
  }

  ngOnInit()
  {
  }

  login()
  {
    // this.authenticationService.login(this.email, this.password).subscribe(() => {
    //   console.log("User is logged in");
    // });
  }
}

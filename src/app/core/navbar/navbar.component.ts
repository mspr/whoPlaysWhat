import { NavigationService } from './../navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  containsStoredUrl() {
    return this.navigationService.containsStoredUrl();
  }

  storedUrl() {
    return this.navigationService.getStoredUrl();
  }

  storedUrlName() {
    return this.navigationService.getStoredUrlName();
  }

  removeStoredUrl() {
    return this.navigationService.removeStoreUrl();
  }
}

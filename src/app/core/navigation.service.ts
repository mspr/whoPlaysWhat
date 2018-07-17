import { ActivatedRoute, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationService {

  private storedUrl = { name: "", url: new Array<UrlSegment>() };
  public urlStored = new EventEmitter();

  constructor() { }

  storeParentRoute(route : ActivatedRoute, name: string) {
    this.storedUrl = { name: name, url: route.parent.snapshot.url };
    this.urlStored.emit();
  }

  removeStoreUrl() {
    this.storedUrl = { name: "", url: new Array<UrlSegment>() };
  }

  getStoredUrl() {
    let url = "";
    this.storedUrl.url.forEach(urlSegment => {
      url += "/" + urlSegment.path;
    });
    return url;
  }

  getStoredUrlName() {
    return this.storedUrl.name;
  }

  containsStoredUrl() {
    return this.storedUrl.url.length > 0;
  }
}

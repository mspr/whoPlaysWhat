import { Band } from './../bands/band';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BandService
{
  public removed = new EventEmitter();
  public added = new EventEmitter<Band>();

  constructor(private httpClient: HttpClient)
  {
  }

  getAll()
  {
    return this.httpClient.get<Band[]>(environment.baseUrl + '/bands');
  }

  getById(id)
  {
    return this.httpClient.get<Band>(environment.baseUrl + `/bands/${id}`);
  }

  add_deprecated(band)
  {
    return this.httpClient.post<Band>(environment.baseUrl + '/bands', band);
  }

  add(band)
  {
    return this.httpClient.post<Band>(environment.api + '/band', band);
  }

  remove(id)
  {
    return this.httpClient.delete<Band>(environment.baseUrl + `/bands/${id}`);
  }

  update(band)
  {
    return this.httpClient.patch<Band>(environment.baseUrl + `/bands/${band.id}`, band)
  }
}

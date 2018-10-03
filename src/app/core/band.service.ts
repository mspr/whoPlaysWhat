import { Band } from './../bands/band';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BandService
{
  public removed = new EventEmitter();
  public added = new EventEmitter<Band>();

  constructor(private httpClient: HttpClient)
  {
  }

  getAll_deprecated()
  {
    return this.httpClient.get<Band[]>(environment.baseUrl + '/bands');
  }

  getAll()
  {
    return this.httpClient.get<any>(environment.api + '/bands');
  }

  upload(formData)
  {
    return this.httpClient.post('http://localhost:8080/upload', formData);
  }

  getById_deprecated(id)
  {
    return this.httpClient.get<Band>(environment.baseUrl + `/bands/${id}`);
  }

  getById(id)
  {
    return this.httpClient.get<Band>(environment.api + `/bands/${id}`);
  }

  add_deprecated(band)
  {
    return this.httpClient.post<Band>(environment.baseUrl + '/bands', band);
  }

  add(band)
  {
    return this.httpClient.post<Band>(environment.api + '/bands', band);
  }

  remove(id)
  {
    return this.httpClient.delete<Band>(environment.api + `/bands/${id}`);
  }

  update(band)
  {
    return this.httpClient.patch<Band>(environment.baseUrl + `/bands/${band.id}`, band)
  }
}

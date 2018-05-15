import { Musician } from './../musicians/musician';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MusicianService {

  public removed = new EventEmitter();
  public added = new EventEmitter<Musician>();

  constructor(private httpClient: HttpClient) { }

  getAllByBand(bandId) {
    return this.httpClient.get<Musician[]>(environment.baseUrl + `/bands/${bandId}` + '/musicians');
  }

  getAll() {
    return this.httpClient.get<Musician[]>(environment.baseUrl + `/musicians`);
  }

  getById(musicianId)
  {
    return this.httpClient.get<Musician>(environment.baseUrl + `/musicians/${musicianId}`);
  }

  add(bandId, musician)
  {
    return this.httpClient.post<Musician>(environment.baseUrl + `/bands/${bandId}` + '/musicians', musician);
  }

  remove(id)
  {
    return this.httpClient.delete<Musician>(environment.baseUrl + `/musicians/${id}`);
  }
}

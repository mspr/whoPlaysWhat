import { Musician } from './../musicians/musician';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MusicianService {

  constructor(private httpClient: HttpClient) { }

  getAll(bandId) {
    return this.httpClient.get<Musician[]>(environment.baseUrl + `/bands/${bandId}` + '/musicians');
  }

  getById(bandId, musicianId)
  {
    return this.httpClient.get<Musician>(environment.baseUrl + `/musicians/${musicianId}`);
  }

  remove(id)
  {
    return this.httpClient.delete<Musician>(environment.baseUrl + `/musicians/${id}`);
  }
}

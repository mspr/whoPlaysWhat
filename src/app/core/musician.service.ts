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
}

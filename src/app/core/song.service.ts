import { Song } from './../songs/song';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SongService {

  public removed = new EventEmitter();
  public added = new EventEmitter<Song>();

  constructor(private httpClient: HttpClient) { }

  getAll()
  {
    return this.httpClient.get<Song[]>(environment.baseUrl + '/songs');
  }

  getById(id)
  {
    return this.httpClient.get<Song>(environment.baseUrl + `/songs/${id}`);
  }

  add(song)
  {
    return this.httpClient.post<Song>(environment.baseUrl + '/songs', song);
  }

  remove(id)
  {
    return this.httpClient.delete<Song>(environment.baseUrl + `/songs/${id}`);
  }

}

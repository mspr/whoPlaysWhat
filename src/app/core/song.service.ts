import { Observable } from 'rxjs/Observable';
import { Song } from './../songs/song';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BandService } from './band.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class SongService
{
  public removed = new EventEmitter();
  public added = new EventEmitter<Song>();
  public updated = new EventEmitter();

  constructor(private httpClient: HttpClient,
    private bandService: BandService) { }

  getById(id)
  {
    return this.httpClient.get<Song>(environment.baseUrl + `/songs/${id}`);
  }

  getAllByBand(band) : Observable<Song[]>
  {
    let getByIdObservables = new Array<Observable<Song>>();
    band.songs.forEach(song =>{
      getByIdObservables.push(this.getById(song.id));
    });

    return forkJoin<Song[]>(getByIdObservables);
  }

  add(song)
  {
    return this.httpClient.post<Song>(environment.baseUrl + '/songs', song);
  }

  update(song)
  {
    return this.httpClient.patch<Song>(environment.baseUrl + `/songs/${song.id}`, song);
  }

  remove(id)
  {
    return this.httpClient.delete<Song>(environment.baseUrl + `/songs/${id}`);
  }
}

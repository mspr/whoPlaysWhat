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

  constructor(private httpClient: HttpClient,
    private bandService: BandService) { }

  getById(id)
  {
    return this.httpClient.get<Song>(environment.baseUrl + `/songs/${id}`);
  }

  getAllByBand(bandId) : Observable<Song[]>
  {
    return this.bandService.getById(bandId).switchMap((band) =>
    {
      let getByIdObservables = new Array<Observable<Song>>();
      band.songIds.forEach(songId =>{
        getByIdObservables.push(this.getById(songId));
      });

      return forkJoin<Song[]>(getByIdObservables);
    });
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

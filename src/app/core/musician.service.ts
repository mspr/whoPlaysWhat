import 'rxjs/add/operator/switchMap';
import { BandService } from './band.service';
import { Musician } from './../musicians/musician';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class MusicianService
{
  public removed = new EventEmitter();
  public added = new EventEmitter<Musician>();

  constructor(private bandService: BandService,
    private httpClient: HttpClient) { }

  getAllByBand(bandId) : Observable<Musician[]>
  {
    return this.bandService.getById(bandId).switchMap((band) =>
    {
      let getByIdObservables = new Array<Observable<Musician>>();
      band.musicianIds.forEach(musicianId =>{
        getByIdObservables.push(this.getById(musicianId));
      });

      return forkJoin<Musician[]>(getByIdObservables);
    });
  }

  getAll()
  {
    return this.httpClient.get<Musician[]>(environment.baseUrl + `/musicians`);
  }

  getById(musicianId)
  {
    return this.httpClient.get<Musician>(environment.baseUrl + `/musicians/${musicianId}`);
  }

  add(musician)
  {
    return this.httpClient.post<Musician>(environment.baseUrl + '/musicians', musician);
  }

  remove(id)
  {
    return this.httpClient.delete<Musician>(environment.baseUrl + `/musicians/${id}`);
  }
}

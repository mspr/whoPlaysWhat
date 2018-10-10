import 'rxjs/add/operator/switchMap';
import { BandService } from './band.service';
import { Musician } from './../musicians/musician';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Band } from '../bands/band';

@Injectable()
export class MusicianService
{
  public removed = new EventEmitter();
  public added = new EventEmitter<Musician>();

  constructor(private bandService: BandService,
    private httpClient: HttpClient)
  {
  }

  getAllByBand(band) : Observable<Musician[]>
  {
    let getByIdObservables = new Array<Observable<Musician>>();
    band.musicians.forEach(musicianBandInfo =>
    {
      let getByIdObservable = this.getById(musicianBandInfo._id).map((musicianInfo) =>
      {
        var musician = Musician.fromInfo(musicianInfo);
        musician.color = musicianBandInfo.color;
        return musician;
      });

      getByIdObservables.push(getByIdObservable);
    });

    return forkJoin<Musician[]>(getByIdObservables);
  }

  getAll()
  {
    return this.httpClient.get<Musician[]>(environment.api + `/musicians`);
  }

  getById(musicianId)
  {
    return this.httpClient.get<Musician>(environment.api + `/musicians/${musicianId}`);
  }

  add(musician)
  {
    return this.httpClient.post<Musician>(environment.api + '/musicians', musician);
  }

  remove(id)
  {
    return this.httpClient.delete<Musician>(environment.api + `/musicians/${id}`);
  }

  update(musician)
  {
    return this.httpClient.patch<Musician>(environment.api + `/musicians/${musician.id}`, musician);
  }
}

import { BandService } from './band.service';
import { Musician } from './../musicians/musician';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MusicianService {

  public removed = new EventEmitter();
  public added = new EventEmitter<Musician>();

  private musiciansByBandId: Subject<Musician> = new Subject<Musician>();

  constructor(private bandService: BandService,
    private httpClient: HttpClient) { }

  getAllByBand(bandId) : Observable<Musician> {

    this.bandService.getById(bandId).subscribe((band) => {
      band.musicianIds.forEach(musicianId => {
        this.getById(musicianId).subscribe((musician) => {
          this.musiciansByBandId.next(musician);
        });
      });
    });

    return this.musiciansByBandId.asObservable();
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

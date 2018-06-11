import { Band } from './../bands/band';
import { Injectable } from '@angular/core';
import { IncomingSong } from '../incoming-songs/incoming-song';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { BandService } from './band.service';
import { environment } from '../../environments/environment';

@Injectable()
export class IncomingSongService {

  constructor(private httpClient: HttpClient,
    private bandService: BandService) { }

  getAllByBand(band : Band)
  {
    return this.httpClient.get<IncomingSong[]>(environment.baseUrl + `/bands/${band.id}/incoming-songs`);
  }
}

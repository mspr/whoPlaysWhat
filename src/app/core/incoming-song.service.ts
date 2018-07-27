import { IncomingSongsHelper } from './../incoming-songs/incoming-songs-helper';
import { element } from 'protractor';
import { Band } from './../bands/band';
import { Injectable } from '@angular/core';
import { IncomingSong } from '../incoming-songs/incoming-song';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class IncomingSongService
{
  constructor(private httpClient: HttpClient)
  {
  }

  getAllByBand(band : Band)
  {
    return this.httpClient.get<IncomingSong[]>(environment.baseUrl + `/bands/${band.id}/incoming-songs`);
  }

  getTopSongs(band: Band, topNumber : number)
  {
    var incomingSongs = band.incomingSongs;
    var topSongs = new Array<IncomingSong>();

    while (topSongs.length < topNumber)
    {
      var higherScore = 0;
      var songWithHigherScore;

      incomingSongs.forEach(songInfo => {
        var song = IncomingSong.fromInfo(songInfo);
        var score = song.score();
        var topSongFound = topSongs.find(s => s.id === song.id);
        if (score >= higherScore && topSongFound === undefined) {
          higherScore = score;
          songWithHigherScore = song;
        }
      });

      topSongs.push(songWithHigherScore);
    }

    return topSongs;
  }

  update(band : Band, song : IncomingSong)
  {
    return this.httpClient.patch<IncomingSong>(environment.baseUrl + `/bands/${band.id}/incoming-songs/${song.id}`, song);
  }
}

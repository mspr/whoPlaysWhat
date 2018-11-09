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

  getTopSongs(band: Band, topNumber : number)
  {
    var topSongs = new Array<IncomingSong>();

    var incomingSongs = band.incomingSongs;
    if (incomingSongs != undefined && incomingSongs.length > 0)
    {
      while (topSongs.length < topNumber)
      {
        let higherScore = 0;
        let songWithHigherScore;

        incomingSongs.forEach(songInfo =>
        {
          let song = IncomingSong.fromJSON(songInfo);
          let score = song.score();
          let topSongFound = topSongs.find(s => s.id === song.id);
          if (score >= higherScore && topSongFound === undefined)
          {
            higherScore = score;
            songWithHigherScore = song;
          }
        });

        if (songWithHigherScore != undefined)
          topSongs.push(songWithHigherScore);
      }
    }

    return topSongs;
  }

  add(band : Band, song : IncomingSong)
  {
    return this.httpClient.post<IncomingSong>(environment.api + '/incomingSongs', { song: song, bandId: band.id });
  }

  update(band : Band, song : IncomingSong)
  {
    return this.httpClient.patch<IncomingSong>(environment.api + `/incomingSongs/${song.id}`, { song: song, bandId: band.id });
  }
}

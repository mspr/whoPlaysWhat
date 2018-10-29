import { IncomingSong } from './../incoming-song';
import { Musician } from './../../musicians/musician';
import { Component, OnInit } from '@angular/core';
import { Band } from '../../bands/band';
import { ActivatedRoute } from '@angular/router';
import { BandService } from '../../core/band.service';
import { IncomingSongService } from '../../core/incoming-song.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'wpw-incoming-songs-add',
  templateUrl: './incoming-songs-add.component.html',
  styleUrls: ['./incoming-songs-add.component.scss']
})

export class IncomingSongsAddComponent implements OnInit
{
  public band : Band;
  public musicians = new Array<Musician>();
  public newIncomingSongsPerMusician = new Map<number, Array<IncomingSong>>();
  public songSuggestionNumber = 5;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private incomingSongService: IncomingSongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById(bandId).subscribe((band) =>
    {
      this.band = band;
      this.musicians = this.band.musicians;

      this.musicians.forEach(musician =>
      {
        var songs = new Array<IncomingSong>(this.songSuggestionNumber);
        for (var i=0; i < this.songSuggestionNumber; ++i)
        {
          var song = new IncomingSong(musician.id);
          this.musicians.forEach(musicianFeedback => {
            song.musiciansFeedback.push({ id: musicianFeedback.id, score: 0 });
          });

          songs[i] = song;
        }

        this.newIncomingSongsPerMusician.set(musician.id, songs);
      });
    });
  }

  add()
  {
    let addSongs = new Array<Observable<IncomingSong>>();
    this.newIncomingSongsPerMusician.forEach(songs => {
      songs.forEach(song => {
        addSongs.push(this.incomingSongService.add(this.band, song));
      });
    });

    forkJoin<IncomingSong[]>(addSongs).subscribe(() =>
    {
      this.bandService.getById(this.band.id).subscribe((band) => {
        this.band = band;
      })
    });
  }
}

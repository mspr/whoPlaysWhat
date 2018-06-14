import { BandService } from './../../core/band.service';
import { IncomingSongService } from './../../core/incoming-song.service';
import { Musician } from './../../musicians/musician';
import { Band } from './../../bands/band';
import { Component, OnInit } from '@angular/core';
import { IncomingSong } from '../incoming-song';
import { MusicianService } from '../../core/musician.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wpw-incoming-songs-show',
  templateUrl: './incoming-songs-show.component.html',
  styleUrls: ['./incoming-songs-show.component.scss']
})
export class IncomingSongsShowComponent implements OnInit
{
  public band : Band;
  public musicians : Musician[];
  public incomingSongs : IncomingSong[];
  private scoreMax = 5;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private incomingSongService: IncomingSongService) { }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById(bandId)
    .switchMap((band) => {
      this.band = band;
      return this.incomingSongService.getAllByBand(this.band);
    })
    .switchMap((incomingSongs) => {
      this.incomingSongs = incomingSongs;
      return this.musicianService.getAllByBand(this.band);
    })
    .subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  getSongsProposedBy(musician : Musician) {
    return this.incomingSongs.filter(s => s.proposer === musician.id);
  }

  getSongScore(song : IncomingSong, musician : Musician) {
    return song.musicians.find(m => m.id === musician.id).score;
  }

  getSongComment(song : IncomingSong, musician : Musician) {
    let comment = song.musicians.find(m => m.id === musician.id).comment;
    return comment != undefined ? comment : '';
  }

  displaySongTitleWithHigherScoreFrom(musician : Musician) {
    let songs = this.getSongsProposedBy(musician);
    if (songs.length > 0)
    {
      songs.sort((s1 : IncomingSong, s2 : IncomingSong) => {
        return s1.score >= s2.score ? -1 : 1;
      });
      return songs[0].title;
    }
    else
      return null;
  }
}

import { Observable } from 'rxjs/Observable';
import { Musician } from './../../musicians/musician';
import { BandService } from './../../core/band.service';
import { MusicianService } from './../../core/musician.service';
import { ActivatedRoute } from '@angular/router';
import { IncomingSong } from './../incoming-song';
import { Component, OnInit } from '@angular/core';
import { Band } from '../../bands/band';
import { IncomingSongService } from '../../core/incoming-song.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'wpw-incoming-songs-update',
  templateUrl: './incoming-songs-update.component.html',
  styleUrls: ['./incoming-songs-update.component.scss']
})

export class IncomingSongsUpdateComponent implements OnInit
{
  public band : Band;
  public musicians : Musician[];
  public incomingSongs : IncomingSong[];
  private scoreMax = 5;
  public songSuggestionNumber = 5;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private incomingSongService: IncomingSongService) { }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById_deprecated(bandId)
    .switchMap((band) => {
      this.band = band;
      this.incomingSongs = band.incomingSongs;
      return this.musicianService.getAllByBand(band);
    })
    .subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  getSongsProposedBy(musician : Musician)
{
    return this.incomingSongs.filter(s => s.proposer === musician.id);
  }

  getSongScore(song : IncomingSong, musician : Musician) {
    let score = song.musicians.find(m => m.id === musician.id).score;
    return score != undefined ? score : 0;
  }

  getSongComment(song : IncomingSong, musician : Musician) {
    let comment = song.musicians.find(m => m.id === musician.id).comment;
    return comment != undefined ? comment : '';
  }

  updateSongScore(wheelEvent : WheelEvent, song : IncomingSong, musician : Musician)
  {
    let songInfoByMusician = song.musicians.find(m => m.id === musician.id);

    let stepValue = 1;
    if (wheelEvent.deltaY >= 0)
      stepValue *= -1;

    let canUpdateScore = (songInfoByMusician.score > 0 && stepValue < 0) ||
      (songInfoByMusician.score < this.scoreMax && stepValue > 0);

    // if (canUpdateScore) {
    //   songInfoByMusician.score += stepValue;
    //   song.score += stepValue;
    // }
  }

  displaySongTitleWithHigherScoreFrom(musician : Musician) {
    let songs = this.getSongsProposedBy(musician);
    if (songs.length > 0)
    {
      songs.sort((s1 : IncomingSong, s2 : IncomingSong) => {
        return this.getScore(s1) >= this.getScore(s2) ? -1 : 1;
      });
      return songs[0].title;
    }
    else
      return null;
  }

  getScore(song : IncomingSong) {
    let score = 0;
    song.musicians.forEach(musician => {
      score += (musician.score != undefined) ? musician.score : 0;
    });
    return score;
  }

  update()
  {
    let updateObservables = new Array<Observable<IncomingSong>>();
    this.incomingSongs.forEach(song => {
      updateObservables.push(this.incomingSongService.update(this.band, song));
    });

    forkJoin<IncomingSong[]>(updateObservables).subscribe(() => {

    });
  }
}

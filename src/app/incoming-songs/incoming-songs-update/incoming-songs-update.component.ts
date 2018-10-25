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
    private incomingSongService: IncomingSongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById(bandId).subscribe((band) =>
    {
      this.band = band;
      this.incomingSongs = band.incomingSongs;
      this.musicians = this.band.musicians;
    });
  }

  getSongsProposedBy(musician : Musician)
  {
    var songs = this.incomingSongs.filter(s => s.proposer === musician.id);
    while (songs.length <= this.songSuggestionNumber)
      songs.push(new IncomingSong(musician.id));

    return songs;
  }

  getSongScore(song : IncomingSong, musician : Musician)
  {
    var musicianAboutSongInfo = song.musicians.find(m => m.id === musician.id);
    if (musicianAboutSongInfo != undefined)
      return musicianAboutSongInfo.score;

    return 0;
  }

  getSongComment(song : IncomingSong, musician : Musician)
  {
    var musicianAboutSongInfo = song.musicians.find(m => m.id === musician.id);
    if (musicianAboutSongInfo != undefined)
      return musicianAboutSongInfo.comment;

    return '';
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

  displaySongTitleWithHigherScoreFrom(musician : Musician)
  {
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

  getScore(song : IncomingSong)
  {
    let score = 0;
    song.musicians.forEach(musician => {
      score += (musician.score != undefined) ? musician.score : 0;
    });
    return score;
  }

  update()
  {
    let updateOrCreateSongs = new Array<Observable<IncomingSong>>();
    this.incomingSongs.forEach(song =>
    {
      if (song.id != undefined)
        updateOrCreateSongs.push(this.incomingSongService.update(this.band, song));
      else
        updateOrCreateSongs.push(this.incomingSongService.add(this.band, song));
    });

    forkJoin<IncomingSong[]>(updateOrCreateSongs).subscribe(() =>
    {
    });
  }
}

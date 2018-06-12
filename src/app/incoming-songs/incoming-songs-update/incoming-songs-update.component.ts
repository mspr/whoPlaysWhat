import { Musician } from './../../musicians/musician';
import { BandService } from './../../core/band.service';
import { MusicianService } from './../../core/musician.service';
import { ActivatedRoute } from '@angular/router';
import { IncomingSong } from './../incoming-song';
import { Component, OnInit } from '@angular/core';
import { Band } from '../../bands/band';
import { IncomingSongService } from '../../core/incoming-song.service';

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

  updateSongScore(wheelEvent : WheelEvent, song : IncomingSong, musician : Musician)
  {
    let songInfoByMusician = song.musicians.find(m => m.id === musician.id);
    wheelEvent.deltaY < 0 ? (songInfoByMusician.score < this.scoreMax ? songInfoByMusician.score++
                                                                      : songInfoByMusician.score)
                          : (songInfoByMusician.score > 0 ? songInfoByMusician.score--
                                                          : songInfoByMusician.score);
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

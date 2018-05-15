import { BandService } from './../../core/band.service';
import { Musician } from './../../musicians/musician';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MusicianService } from '../../core/musician.service';

@Component({
  selector: 'wpw-song',
  templateUrl: './songs-show.component.html',
  styleUrls: ['./songs-show.component.scss']
})
export class SongsShowComponent implements OnInit {

  public bandId : number;
  public song = new Song();
  public musicians : Musician[] = new Array<Musician>();

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private songService: SongService) { }

  ngOnInit() {

    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params.pipe(
      switchMap((params) => this.songService.getById(params.id))
    ).subscribe((song) => {
        this.song = song;
    });
  }

  retrieveMusicians() {
    this.bandService.getById(this.bandId).subscribe((band) => {
      this.musicianService.getAllByBand(band.id).subscribe((musicians) => {
        this.musicians = musicians;
      });
    });
  }
}

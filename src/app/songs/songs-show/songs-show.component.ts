import { BandService } from './../../core/band.service';
import { Musician } from './../../musicians/musician';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class SongsShowComponent implements OnInit, OnDestroy
{
  public bandId : number;
  public song = new Song();
  public musicians : Musician[] = new Array<Musician>();
  public musiciansColor = {};
  public retrieveMusiciansSubscription;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private songService: SongService) {
  }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.parent.snapshot.params['id'];

    this.activatedRoute.params.pipe(
      switchMap((params) => this.songService.getById(params.id))
    ).subscribe((song) => {
        this.song = song;
        this.retrieveMusicians();
    });
  }

  retrieveMusicians()
  {
    if (!this.retrieveMusiciansSubscription)
    {
      this.retrieveMusiciansSubscription = this.musicianService.getAllByBand(this.bandId).subscribe((musicians) => {
        this.musicians = musicians;
        //this.musiciansColor[musician.id] = musician.bands.find(element => element.id_band == this.bandId).color;
      });
    }
  }

  ngOnDestroy()
  {
    this.retrieveMusiciansSubscription.unsubscribe();
  }
}

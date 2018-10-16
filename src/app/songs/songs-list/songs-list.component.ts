import { Subject } from 'rxjs/Subject';
import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SongService } from './../../core/song.service';
import { Song } from './../song';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'wpw-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})

export class SongsListComponent implements OnInit, OnDestroy
{
  public songs : Song[] = new Array<Song>();
  public band : Band;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.params['id'];

    this.bandService.getById(bandId).subscribe((band) => {
      this.band = Band.fromInfo(band);
      this.retrieveSongs();
    })

    this.songService.removed.subscribe(() => {
      this.retrieveSongs();
    });

    this.songService.added.subscribe(() => {
      this.retrieveSongs();
    });

    this.songService.updated.subscribe(() => {
      this.retrieveSongs();
    });
  }

  ngOnDestroy()
  {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onRemove(id)
  {
    this.songService.getById(id).switchMap((songInfo) =>
    {
      let song = Song.fromInfo(songInfo);
      this.band.songs.splice(this.band.songs.indexOf(song.id), 1);
      return this.bandService.update(this.band);
    })
    .switchMap(() => this.songService.remove(id))
    .subscribe(() =>
    {
      this.songService.removed.emit();
      this.router.navigate([`bands/${this.band.id}`, 'songs']);
    });
  }

  private retrieveSongs()
  {
    this.bandService.getById(this.band.id)
      .takeUntil(this.componentDestroyed$)
      .subscribe((band) =>
      {
        this.band = Band.fromInfo(band);
        this.songs = [];
        this.band.songs.forEach(songInfo => {
          this.songs.push(Song.fromInfo(songInfo));
        });
      })
  }

  getSongProgressionStyle(song : Song)
  {
    return { 'background': '-webkit-linear-gradient(left, rgb(168, 190, 168) ' + song.progression + '%, white ' + song.progression + '%)' };
  }
}

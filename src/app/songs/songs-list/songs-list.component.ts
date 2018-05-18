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
  public bandId : number;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private songService: SongService) { }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.retrieveSongs();

    this.songService.removed.subscribe(() => {
      this.retrieveSongs();
    });

    this.songService.added.subscribe(() => {
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
    this.songService.getById(id).switchMap((song) =>
    {
      return this.bandService.getAll().switchMap((bands) =>
      {
        let updateBandObservables = new Array<Observable<Band>>();
        bands.forEach(band => {
          let index = band.songIds.indexOf(song.id);
          if (index != -1) {
            band.songIds.splice(band.songIds.indexOf(song.id), 1);
            updateBandObservables.push(this.bandService.update(band));
          }
        });

        return forkJoin(updateBandObservables);
      })
      .switchMap(() => this.songService.remove(id))
    })
    .subscribe(() => {
      this.songService.removed.emit();
      this.router.navigate([`bands/${this.bandId}`, 'songs']);
    });
  }

  private retrieveSongs()
  {
    this.songService.getAllByBand(this.bandId)
      .takeUntil(this.componentDestroyed$)
      .subscribe((songs) => {
        this.songs = songs;
      });
  }
}

import { Subject } from 'rxjs/Subject';
import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SongService } from './../../core/song.service';
import { Song } from './../song';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map'

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
    this.songService.remove(id).subscribe(() => {
      this.songService.removed.emit();
      this.router.navigate(['songs']);
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

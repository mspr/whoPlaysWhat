import { Roles } from './../../core/roles.enum';
import { Band } from './../../bands/band';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../../core/musician.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { BandService } from '../../core/band.service';
import { RolesHelper } from '../../core/roles-helper';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'wpw-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})

export class MusiciansListComponent implements OnInit, OnDestroy
{
  public band : Band;
  public musicians : Musician[] = new Array<Musician>();
  public retrieveMusiciansSubscription : Subscription;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params
      .switchMap(params => this.bandService.getById(params.id))
      .subscribe(band =>
      {
        this.band = band;
        this.retrieveMusicians();
      });

    this.musicianService.added.subscribe(() => {
      this.retrieveMusicians();
    });

    this.musicianService.updated.subscribe(() => {
      this.retrieveMusicians();
    });

    this.musicianService.removed.subscribe(() => {
      this.retrieveMusicians();
    });
  }

  ngOnDestroy()
  {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onRemove(id)
  {
    this.musicianService.getById(id).switchMap((musicianInfo) =>
    {
      var musician = Musician.fromJSON(musicianInfo);
      let musicianBandInfo = this.band.musicians.find(m => m._id === musician.id);
      let bandMusicianIdx = this.band.musicians.indexOf(musicianBandInfo);
      this.band.musicians.splice(bandMusicianIdx, 1);

      this.band.songs.forEach(song => {
        let songMusicianInfo = song.musicians.find(m => m._id === musician.id);
        let songMusicianIdx = song.musicians.indexOf(songMusicianInfo);
        song.musicians.splice(songMusicianIdx, 1);
      });

      return this.bandService.update(this.band);
    })
    .switchMap(() => this.musicianService.remove(id))
    .subscribe(() => {
      this.musicianService.removed.emit();
      this.router.navigate([`bands/${this.band.id}`, 'musicians']);
    });
  }

  getRolesIconsPaths(musician : Musician)
  {
    return RolesHelper.getRolesIconsPaths(musician);
  }

  private retrieveMusicians()
  {
    this.musicians = [];

    this.bandService.getById(this.band.id)
      .takeUntil(this.componentDestroyed$)
      .subscribe((band) =>
      {
        this.band = band;
        band.musicians.forEach(musician => {
          musician.color = band.musiciansColor.find(m => m.id === musician.id).color;
          this.musicians.push(musician);
        });
      });
  }
}

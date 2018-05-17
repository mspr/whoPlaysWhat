import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../../core/musician.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'wpw-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})
export class MusiciansListComponent implements OnInit, OnDestroy
{
  public bandId : number;
  public musicians : Musician[] = new Array<Musician>();
  public retrieveMusiciansSubscription : Subscription;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService) { }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.retrieveMusicians();

    this.musicianService.added.subscribe(() => {
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
    this.musicianService.remove(id).subscribe(() => {
      this.musicianService.removed.emit();
      this.router.navigate([`bands/${this.bandId}`, 'musicians']);
    });
  }

  private retrieveMusicians()
  {
    this.musicianService.getAllByBand(this.bandId)
      .takeUntil(this.componentDestroyed$)
      .subscribe((musicians) => {
        this.musicians = musicians;
      });
  }
}

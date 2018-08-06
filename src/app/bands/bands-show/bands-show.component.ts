import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Key } from 'protractor';

@Component({
  selector: 'wpw-bands-show',
  templateUrl: './bands-show.component.html',
  styleUrls: ['./bands-show.component.scss']
})
export class BandsShowComponent implements OnInit
{
  public band : Band;
  public dayEventsToDisplay = false;
  public selectedDate : Date;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    if (event.keyCode === 27)
      this.dayEventsToDisplay = false;
  }

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService) { }

  ngOnInit()
  {
    this.activatedRoute.params.pipe(
      switchMap((params) => this.bandService.getById(params.id))
    ).subscribe((band) => {
        this.band = band;
    });
  }

  onRemove()
  {
    this.bandService.remove(this.band.id).subscribe(() => {
      this.bandService.removed.emit();
      this.router.navigate(['bands']);
    });
  }

  displayEventsForDate(date: Date)
  {
    this.dayEventsToDisplay = true;
    this.selectedDate = date;
  }
}

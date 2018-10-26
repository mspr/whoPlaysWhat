import { IncomingSong } from './../incoming-song';
import { Musician } from './../../musicians/musician';
import { Component, OnInit } from '@angular/core';
import { Band } from '../../bands/band';
import { ActivatedRoute } from '@angular/router';
import { BandService } from '../../core/band.service';
import { IncomingSongService } from '../../core/incoming-song.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'wpw-incoming-songs-add',
  templateUrl: './incoming-songs-add.component.html',
  styleUrls: ['./incoming-songs-add.component.scss']
})

export class IncomingSongsAddComponent implements OnInit
{
  public band : Band;
  public musicians = new Array<Musician>();
  public newIncomingSongs = new Array<IncomingSong>();
  public songSuggestionNumber = 5;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private incomingSongService: IncomingSongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById(bandId).subscribe((band) =>
    {
      this.band = band;
      this.musicians = this.band.musicians;

      this.musicians.forEach(musician => {
        for (var i=0; i < this.songSuggestionNumber; ++i)
          this.newIncomingSongs.push(new IncomingSong(musician.id));
      });
    });
  }

  getSongsProposedBy(musician : Musician)
  {
    return this.newIncomingSongs.filter(s => s.proposer === musician.id);
  }

  add()
  {
    let addSongs = new Array<Observable<IncomingSong>>();
    this.newIncomingSongs.forEach(song => {
      // addSongs.push(this.incomingSongService.add(this.band, song));
    });

    // forkJoin<IncomingSong[]>(addSongs).subscribe(() =>
    // {
    //   this.bandService.getById(this.band.id).subscribe((band) => {
    //     this.band = band;
    //   })
    // });
  }
}

import { Roles } from './../../core/roles.enum';
import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/map'
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'wpw-musicians-add',
  templateUrl: './musicians-add.component.html',
  styleUrls: ['./musicians-add.component.scss']
})
export class MusiciansAddComponent implements OnInit
{
  public band : Band;
  public musician = new Musician();

  public optionsModel: number[] = [1];
  public mySettings: IMultiSelectSettings = {};
  public myTexts: IMultiSelectTexts = {};
  public myOptions: IMultiSelectOption[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService)
  {
    let options = [];
    let id : number = 1;
    Object.keys(Roles).forEach(key => {
      options.push({ id: id, name: key });
      ++id;
    });
    this.myOptions = options;
  }

  ngOnInit()
  {
  }

  add()
  {
    let bandId = this.activatedRoute.parent.snapshot.params['id'];

    this.optionsModel.forEach(roleIdx => {
      let keys = Object.keys(Roles);
      this.musician.roles.push(keys[roleIdx-1]);
    });

    this.musicianService.add(this.musician).switchMap((musician) =>
    {
      return this.bandService.getById(bandId).switchMap((band) =>
      {
        this.band = Band.fromInfo(band);
        this.band.musicians.push( { _id: musician.id } );
        this.band.musiciansColor.push( { id: musician.id, color: this.musician.color } );
        this.band.songs.forEach(song => song.musicians.push( { _id: musician.id, plays: [] } ));
        return this.bandService.update(this.band).map(band => musician);
      });
    }).subscribe((musician) =>
    {
        this.musicianService.added.emit(musician);
        this.router.navigate([`bands/${bandId}`, 'musicians', musician.id]);
    });
  }

  onChange(role)
  {
    console.log(role);
  }
}

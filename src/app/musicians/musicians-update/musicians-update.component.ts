import { Band } from './../../bands/band';
import { Roles } from './../../core/roles.enum';
import { RolesHelper } from './../../core/roles-helper';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Musician } from './../musician';
import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-musicians-update',
  templateUrl: './musicians-update.component.html',
  styleUrls: ['./musicians-update.component.scss']
})
export class MusiciansUpdateComponent implements OnInit
{
  public band : Band;
  public musician = new Musician();

  public optionsModel: number[] = [];
  public mySettings: IMultiSelectSettings = {};
  public myTexts: IMultiSelectTexts = {};
  public myOptions: IMultiSelectOption[];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private musicianService: MusicianService)
  {
    let options = [];
    let id : number = 1;
    RolesHelper.getRoles().forEach(key => {
      options.push({ id: id, name: key });
      ++id;
    });
    this.myOptions = options;
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.parent.snapshot.params["id"];
    let musicianId = this.activatedRoute.snapshot.params["id"];

    this.musicianService.getById(musicianId).switchMap((musician) => {
      this.musician = musician;
      let roles = RolesHelper.getRoles();
      this.musician.roles.forEach(role => {
        this.optionsModel.push(roles.indexOf(role) + 1);
      });

      return this.bandService.getById(bandId);
    })
    .subscribe((band) => {
      this.musician.color = band.musicians.find(m => m.id == this.musician.id).color;
    });
  }

  onChange(role) {
    console.log(role);
  }

  update()
  {
    this.musician.roles = [];
    this.optionsModel.forEach(roleIdx => {
      let keys = Object.keys(Roles);
      this.musician.roles.push(keys[roleIdx-1]);
    });

    this.musicianService.update(this.musician).switchMap((musician) => {
      this.band.musicians.find(m => m.id == musician.id).color = musician.color;
      return this.bandService.update(this.band);
    })
    .subscribe(() => {
      this.router.navigate([`bands/${this.band.id}`, 'musicians', this.musician.id]);
    });
  }
}

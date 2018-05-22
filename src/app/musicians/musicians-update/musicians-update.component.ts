import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Musician } from './../musician';
import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../core/roles';

@Component({
  selector: 'wpw-musicians-update',
  templateUrl: './musicians-update.component.html',
  styleUrls: ['./musicians-update.component.scss']
})
export class MusiciansUpdateComponent implements OnInit
{
  public bandId : number;
  public musician = new Musician();
  public color;

  public optionsModel: number[] = [];
  public mySettings: IMultiSelectSettings = {};
  public myTexts: IMultiSelectTexts = {};
  public myOptions: IMultiSelectOption[];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
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
    let musicianId = this.activatedRoute.snapshot.params["id"];
    this.bandId = this.activatedRoute.parent.snapshot.params["id"];
    this.musicianService.getById(musicianId).subscribe((musician) => {
      this.musician = musician;
      this.color = this.musician.bands.find(elt => elt.id_band == this.bandId).color;

      let roles = Object.keys(Roles);
      this.musician.roles.forEach(role => {
        this.optionsModel.push(roles.indexOf(role) + 1);
      });
    });
  }

  onChange(role) {
    console.log(role);
  }

  update()
  {
    this.musician.bands.find(elt => elt.id_band == this.bandId).color = this.color;

    this.musician.roles = [];
    this.optionsModel.forEach(roleIdx => {
      let keys = Object.keys(Roles);
      this.musician.roles.push(keys[roleIdx-1]);
    });

    this.musicianService.update(this.musician).subscribe((musician) => {
      this.router.navigate([`bands/${this.bandId}`, 'musicians', musician.id]);
    });
  }
}

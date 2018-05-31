import { SongLevel } from './../song-level.enum';
import { Musician } from './../../musicians/musician';
import { Tonalities } from './../../core/tonalities.enum';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-songs-add',
  templateUrl: './songs-add.component.html',
  styleUrls: ['./songs-add.component.scss']
})
export class SongsAddComponent implements OnInit
{
  public bandId : number;
  public song = new Song();
  public tonalities = Object.keys(Tonalities);
  public tonality : Tonalities = Tonalities.A;
  public tempo : number = 90;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit() {
    this.bandId = this.activatedRoute.parent.snapshot.params['id'];
    this.song.bands = [{ id: this.bandId, structure: [], musicians: [] }];
  }

  add()
  {
    let songBandInfo = this.GetSongBandInfo(this.bandId);
    songBandInfo.tonality = this.tonality;
    songBandInfo.tempo = this.tempo;

    this.songService.add(this.song).switchMap((song) =>
    {
      return this.bandService.getById(this.bandId).switchMap((band) => {
        band.songIds.push(song.id);
        return this.bandService.update(band).map(band => song);
      });
    }).subscribe((song) => {
        this.songService.added.emit(song);
        this.router.navigate([`bands/${this.bandId}`, 'songs', song.id]);
    });
  }

  getSongLevelNames() {
    let songLevelNames : string[] = [];
    Object.keys(SongLevel).forEach(songLevel => {
      songLevelNames.push(SongLevel[songLevel]);
    });
    return songLevelNames;
  }

  private GetSongBandInfo(bandId : number) {
    return this.song.bands != undefined ? this.song.bands.find(elt => elt.id == bandId) : null;
  }
}

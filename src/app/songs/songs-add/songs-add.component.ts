import { Musician } from './../../musicians/musician';
import { Tonalities } from './../../core/tonalities.enum';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BandService } from '../../core/band.service';
import { MusicianService } from '../../core/musician.service';
import { SongParts } from '../../core/song-parts.enum';

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
  public tonality : Tonalities;
  public tempo : number = 90;
  public musicians : Musician[] = new Array<Musician>();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.parent.snapshot.params["id"];
    this.musicianService.getAllByBand(this.bandId).subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  add()
  {
    this.song.bands = [{ id: this.bandId, tonality: this.tonality, tempo: this.tempo }];

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

  getMusicianColor(musician) {
    return (musician != null) ? musician.bands.find(element => element.id_band == this.bandId).color : null;
  }

  getSongParts() {
    return Object.keys(SongParts);
  }

  addSongPart(songPart) {

  }
}

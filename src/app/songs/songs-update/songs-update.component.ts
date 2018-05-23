import { SongService } from './../../core/song.service';
import { Tonalities } from './../../core/tonalities.enum';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wpw-songs-update',
  templateUrl: './songs-update.component.html',
  styleUrls: ['./songs-update.component.scss']
})
export class SongsUpdateComponent implements OnInit {

  public bandId : number;
  public song = new Song();
  public tonalities = Object.keys(Tonalities);
  public tonality : Tonalities;
  public tempo;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private songService: SongService) { }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.parent.snapshot.params["id"];
    let songId = this.activatedRoute.snapshot.params["id"];

    this.songService.getById(songId).subscribe((song) => {
      this.song = song;
      let infoByBand = song.bands.find(band => band.id == this.bandId);
      this.tempo = infoByBand.tempo;
      this.tonality = infoByBand.tonality;
    });
  }

  update()
  {
    let band = this.getInfoByBand();
    band.tonality = this.tonality;
    band.tempo = this.tempo;

    this.songService.update(this.song).subscribe((song) => {
      this.router.navigate([`bands/${this.bandId}`, 'songs', song.id]);
    });
  }

  private getInfoByBand() {
    return this.song.bands.find(band => band.id == this.bandId);
  }
}

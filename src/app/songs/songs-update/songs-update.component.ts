import { Musician } from './../../musicians/musician';
import { SongService } from './../../core/song.service';
import { Tonalities } from './../../core/tonalities.enum';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { ActivatedRoute, Router } from '@angular/router';
import { SongParts } from '../../core/song-parts.enum';
import { MusicianService } from '../../core/musician.service';

@Component({
  selector: 'wpw-songs-update',
  templateUrl: './songs-update.component.html',
  styleUrls: ['./songs-update.component.scss']
})
export class SongsUpdateComponent implements OnInit {

  public bandId : number;
  public musicians : Musician[] = new Array<Musician>();
  public song = new Song();
  public tonalities = Object.keys(Tonalities);
  public tonality : Tonalities;
  public tempo;

  public availableParts : string[] = Object.keys(SongParts);
  public songParts : string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private musicianService: MusicianService,
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
      this.songParts = this.song.structure;
    });

    this.musicianService.getAllByBand(this.bandId).subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  update()
  {
    let songInfoByBand = this.getSongInfoByBand();
    songInfoByBand.tonality = this.tonality;
    songInfoByBand.tempo = this.tempo;

    this.songService.update(this.song).subscribe((song) => {
      this.router.navigate([`bands/${this.bandId}`, 'songs', song.id]);
    });
  }

  private getSongInfoByBand() {
    return this.song.bands.find(band => band.id == this.bandId);
  }

  getMusicianColor(musician) {
    return (musician != null) ? musician.bands.find(element => element.id_band == this.bandId).color : null;
  }

  addSongPart(songPart)
  {
    if (songPart === SongParts.Outro) {
      this.availableParts = [];
    }

    let introductionIdx = this.availableParts.indexOf(SongParts.Introduction);
    if (introductionIdx != -1) {
      this.availableParts.splice(introductionIdx, 1);
    }

    if (songPart === SongParts.Verse || songPart === SongParts.Solo) {
      let verseOccurences = this.songParts.filter((value) => {
        return value.includes(songPart);
      }).length;
      songPart = songPart + " " + (verseOccurences + 1);
    }

    this.songParts.push(songPart);
  }

  clearSongParts() {
    this.songParts.length = 0;
    this.availableParts = Object.keys(SongParts);
    this.song.musicians = [];
  }

  doesMusicianPlayThisPart(part, musicianId) {
    let partsPlayedByTheMusician = this.song.musicians.find(elt=> elt.id == musicianId);
    return partsPlayedByTheMusician != undefined && partsPlayedByTheMusician.plays.find(elt => elt === part);
  }

  onClick(musician, part)
  {
    let musicianInfo = this.song.musicians.find(info => info.id === musician.id);
    if (musicianInfo) {
      musicianInfo.plays.push(part);
    } else {
      this.song.musicians.push({id: musician.id, plays:[part]});
    }
  }
}

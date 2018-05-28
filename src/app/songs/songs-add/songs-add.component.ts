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
  public tonality : Tonalities = Tonalities.A;
  public tempo : number = 90;
  public musicians : Musician[] = new Array<Musician>();

  public availableParts : string[] = Object.keys(SongParts);
  public songParts : string[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private songService: SongService)
  {
    this.song.musicians = [];
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
    this.song.structure = this.songParts;

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

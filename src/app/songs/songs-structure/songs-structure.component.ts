import { MusicianService } from './../../core/musician.service';
import { Component, OnInit, Input } from '@angular/core';
import { SongParts } from '../../core/song-parts.enum';
import { Musician } from '../../musicians/musician';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../song';

@Component({
  selector: 'wpw-songs-structure',
  templateUrl: './songs-structure.component.html',
  styleUrls: ['./songs-structure.component.scss']
})
export class SongsStructureComponent implements OnInit
{
  public bandId : number;
  public musicians : Musician[];

  @Input()
  public song : Song = new Song();

  public availableParts : string[] = Object.keys(SongParts);

  constructor(private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService) { }

  ngOnInit() {
    this.bandId = this.activatedRoute.parent.snapshot.params["id"];
    this.musicianService.getAllByBand(this.bandId).subscribe((musicians) => {
      this.musicians = musicians;
    });
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
      let verseOccurences = this.song.structure.filter((value) => {
        return value.includes(songPart);
      }).length;
      songPart = songPart + " " + (verseOccurences + 1);
    }

    this.song.structure.push(songPart);
  }

  clearSongParts() {
    this.song.structure.length = 0;
    this.availableParts = Object.keys(SongParts);
    this.song.musicians = [];
  }

  getMusicianColor(musician) {
    return (musician != null) ? musician.bands.find(element => element.id_band == this.bandId).color : null;
  }

  doesMusicianPlayThisPart(part, musicianId) {
    let partsPlayedByTheMusician = this.song.musicians.find(elt=> elt.id == musicianId);
    return partsPlayedByTheMusician != undefined && partsPlayedByTheMusician.plays.find(elt => elt === part);
  }

  markPartAsPlayedForMusician(musician, part)
  {
    let musicianInfo = this.song.musicians.find(info => info.id === musician.id);
    if (musicianInfo) {
      musicianInfo.plays.push(part);
    } else {
      this.song.musicians.push({id: musician.id, plays:[part]});
    }
  }
}

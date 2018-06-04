import { RolesHelper } from './../../core/roles-helper';
import { Band } from './../../bands/band';
import { MusicianService } from './../../core/musician.service';
import { Component, OnInit, Input } from '@angular/core';
import { SongParts } from '../../core/song-parts.enum';
import { Musician } from '../../musicians/musician';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../song';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-songs-structure',
  templateUrl: './songs-structure.component.html',
  styleUrls: ['./songs-structure.component.scss']
})
export class SongsStructureComponent implements OnInit
{
  public band : Band;
  public musicians : Musician[];

  @Input()
  public song : Song = new Song();

  public availableParts : string[] = Object.keys(SongParts);

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService) { }

  ngOnInit()
  {
    let bandId = this.activatedRoute.parent.snapshot.params["id"];

    this.bandService.getById(bandId).switchMap((band) => {
      this.band = band;
      return this.musicianService.getAllByBand(band);
    })
    .subscribe((musicians) => {
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
    this.song.musicians.forEach(musician => {
      musician.plays = [];
    });
  }

  doesMusicianPlayThisPart(part, musicianId) {
    let songMusicianInfo = this.song.musicians.find(m => m.id == musicianId);
    return songMusicianInfo != undefined ? songMusicianInfo.plays.find(p => p === part) : false;
  }

  updatePartForMusician(musician, part)
  {
    let songMusicianInfo = this.song.musicians.find(m => m.id == musician.id);
    if (songMusicianInfo)
    {
      let partIdx = songMusicianInfo.plays.indexOf(part);
      if (partIdx != -1)
        songMusicianInfo.plays.splice(partIdx, 1);
      else
        songMusicianInfo.plays.push(part);
    }
    else
      this.song.musicians.push({id: musician.id, plays:[part]});
  }

  updatePartForMusicians(part) {
    this.musicians.forEach(musician => {
      this.updatePartForMusician(musician, part);
    });
  }

  getRolesIconsPaths(musician : Musician) {
    return RolesHelper.getRolesIconsPaths(musician);
  }
}

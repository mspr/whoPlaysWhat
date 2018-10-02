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
  public song = new Song();

  @Input()
  public readOnly = false;

  public songParts = Object.keys(SongParts).filter(p => isNaN(<any>p));

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.parent.snapshot.params["id"];

    this.bandService.getById_deprecated(bandId).switchMap((band) => {
      this.band = band;
      return this.musicianService.getAllByBand(band);
    })
    .subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  addSongPart(songPartIdx : number)
  {
    var songPart = SongParts[songPartIdx];

    if (songPartIdx === SongParts.Verse || songPartIdx === SongParts.Solo)
    {
      let verseOccurences = this.song.structure.filter((value) => {
        return value.includes(songPart);
      }).length;
      songPart = songPart + " " + (verseOccurences + 1);
    }

    this.song.structure.push(songPart);
  }

  isPartAvailable(songPartIdx : number)
  {
    return (this.song.structure.indexOf(SongParts[songPartIdx]) == -1 || songPartIdx === SongParts.Chorus || songPartIdx === SongParts.PreChorus)
     && this.song.structure.indexOf(SongParts[SongParts.Outro]) == -1;
  }

  clearSongParts()
  {
    this.song.structure.length = 0;
    this.song.musicians.forEach(musician => {
      musician.plays = [];
    });
  }

  doesMusicianPlayThisPart(part, musicianId)
  {
    let songMusicianInfo = this.song.musicians.find(m => m.id == musicianId);
    return songMusicianInfo != undefined ? songMusicianInfo.plays.find(p => p === part) : false;
  }

  updatePartForMusician(musician, part)
  {
    if (this.readOnly)
      return;

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

  updatePartForMusicians(part)
  {
    this.musicians.forEach(musician => {
      this.updatePartForMusician(musician, part);
    });
  }

  getRolesIconsPaths(musician : Musician)
  {
    return RolesHelper.getRolesIconsPaths(musician);
  }
}

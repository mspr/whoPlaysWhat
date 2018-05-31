import { Component, OnInit } from '@angular/core';
import { SongLevelHelper } from '../song-level-helper';

@Component({
  selector: 'wpw-songs-level',
  templateUrl: './songs-level.component.html',
  styleUrls: ['./songs-level.component.scss']
})
export class SongsLevelComponent implements OnInit
{
  private songLevelSelectedIdx : number = 0;

  constructor() { }

  ngOnInit() {
  }

  getSongLevelNames() {
    return SongLevelHelper.getSongLevelNames();
  }

  adjustSongLevel(idx : number) {
    this.songLevelSelectedIdx = idx;
  }

  isSongLevelGreaterThanSelected(idx : number) {
    return idx > this.songLevelSelectedIdx;
  }
}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { SongLevelHelper } from '../song-level-helper';
import { SongLevel } from '../song-level.enum';

@Component({
  selector: 'wpw-songs-level',
  templateUrl: './songs-level.component.html',
  styleUrls: ['./songs-level.component.scss']
})

export class SongsLevelComponent implements OnInit, OnChanges
{
  @Input()
  public defaultLevel : number;

  @Input()
  public readOnly = false;

  private hoveredLevel : number = 0;

  @Output()
  public onSongLevelClick = new EventEmitter<number>();

  constructor()
  {
  }

  ngOnInit()
  {
    this.hoveredLevel = this.defaultLevel;
  }

  ngOnChanges()
  {
    this.hoveredLevel = this.defaultLevel;
  }

  getLevelNames()
  {
    return SongLevelHelper.getSongLevelNames();
  }

  updateHoveredLevel(idx : number)
  {
    this.hoveredLevel = idx;
  }

  isLevelGreaterThanHovered(idx : number)
  {
    return idx > this.hoveredLevel;
  }

  onLevelClick()
  {
    this.onSongLevelClick.emit(this.hoveredLevel);
  }

  resetLevel()
  {
    this.hoveredLevel = this.defaultLevel;
  }
}

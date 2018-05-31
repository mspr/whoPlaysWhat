import { SongLevel } from './song-level.enum';
export class Song {
  public id? : number;
  public name : string = '';
  public bands = [];
  public level : SongLevel = SongLevel.Easy;
}

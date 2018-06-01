import { Tonalities } from './../core/tonalities.enum';
import { SongLevel } from './song-level.enum';
export class Song {
  public id? : number;
  public name : string = '';
  public level : SongLevel = SongLevel.Easy;
  public tempo : number = 90;
  public tonality : Tonalities = Tonalities.A;
  public structure = [];
  public musicians = [];
}

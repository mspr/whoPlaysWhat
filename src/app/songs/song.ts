import { Tonalities } from './../core/tonalities.enum';
import { SongLevel } from './song-level.enum';

export class Song
{
  public id? : number;
  public title = '';
  public level = SongLevel.Easy;
  public tempo = 90;
  public tonality = Tonalities.A;
  public structure = [];
  public musicians = [];
  public progression = 0;
}

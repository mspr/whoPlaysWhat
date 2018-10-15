import { SongLevelHelper } from './song-level-helper';
import { SongTonality } from './song-tonality.enum';
import { SongLevel } from './song-level.enum';

export class Song
{
  public id? : number;
  public title = '';
  public level = SongLevel.Easy;
  public tempo = 90;
  public tonality = SongTonality.A;
  public structure = [];
  public musicians = [];
  public progression = 0;

  static fromInfo(info)
  {
    let song = new Song();

    song.title = info.title;
    song.id = info.id;
    song.level = SongLevelHelper.getSongLevelIndex(info.level);
    song.tempo = info.tempo;
    song.tonality = info.tonality;
    song.structure = info.structure;
    song.musicians = info.musicians;
    song.progression = info.progression;

    return song;
  }
}

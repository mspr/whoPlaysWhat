import { Musician } from '../musicians/musician';
import { SongLevel } from '../songs/song-level.enum';

export class IncomingSong
{
  public id? : number;
  public title : string = '';
  public link : string = '';
  public proposer : number;
  public level = SongLevel.Easy;
  public musicians = [];

  constructor(proposer : number)
  {
  }

  static fromInfo(info)
  {
    var song = new IncomingSong(info.proposer);
    song.id = info.id;
    song.title = info.title;
    song.link = info.link;
    song.musicians = info.musicians;
    song.level = info.level;
    song.proposer = info.proposer;
    return song;
  }

  hasHigherScoreThan(song: IncomingSong)
  {
    return this.score() >= song.score();
  }

  score()
  {
    var score = 0;
    this.musicians.forEach(musician => score += musician.score);
    return score;
  }
}

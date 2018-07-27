import { Musician } from '../musicians/musician';

export class IncomingSong
{
  public id? : number;
  public title : string = '';
  public link : string = '';
  public proposer : number;
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

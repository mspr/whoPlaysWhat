import { IncomingSong } from './incoming-song';
import { Musician } from '../musicians/musician';

export class IncomingSongsHelper
{
  private incomingSongs = new Array<IncomingSong>();

  constructor(incomingSongs : IncomingSong[])
  {
    this.incomingSongs = incomingSongs;
  }

  getSongComment(song : IncomingSong, musician : Musician)
  {
    let comment = song.musiciansFeedback.find(m => m.id === musician.id).comment;
    return comment != undefined ? comment : '';
  }

  getSongScore(song : IncomingSong, musician : Musician)
  {
    let score = song.musiciansFeedback.find(m => m.id === musician.id).score;
    return score != undefined ? score : 0;
  }

  getSongsProposedBy(musician : Musician)
  {
    return this.incomingSongs.filter(s => s.proposer === musician.id);
  }

  displaySongTitleWithHigherScoreFrom(musician : Musician)
  {
    let songs = this.getSongsProposedBy(musician);
    if (songs.length > 0)
    {
      songs.sort((s1 : IncomingSong, s2 : IncomingSong) => {
        return s1.score() >= s2.score() ? -1 : 1;
      });
      return songs[0].title;
    }
    else
      return null;
  }
}

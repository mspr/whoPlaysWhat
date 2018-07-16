import { IncomingSong } from './incoming-song';
import { Musician } from '../musicians/musician';

export class IncomingSongsHelper
{
  private incomingSongs : IncomingSong[];

  constructor(incomingSongs : IncomingSong[])
  {
    this.incomingSongs = incomingSongs;
  }

  getSongComment(song : IncomingSong, musician : Musician)
  {
    let comment = song.musicians.find(m => m.id === musician.id).comment;
    return comment != undefined ? comment : '';
  }

  getSongScore(song : IncomingSong, musician : Musician)
  {
    let score = song.musicians.find(m => m.id === musician.id).score;
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
        return this.getTotalScore(s1) >= this.getTotalScore(s2) ? -1 : 1;
      });
      return songs[0].title;
    }
    else
      return null;
  }

  getTotalScore(song : IncomingSong)
  {
    let score = 0;
    song.musicians.forEach(musician => {
      score += (musician.score != undefined) ? musician.score : 0;
    });
    return score;
  }
}

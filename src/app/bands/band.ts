import { IncomingSong } from '../incoming-songs/incoming-song';

export class Band
{
  public id? : number;
  public name : string;
  public picture : string;
  public songs = [];
  public incomingSongs : IncomingSong[] = [];
  public musicians = [];
  public notes = [];
  public events = [];
}

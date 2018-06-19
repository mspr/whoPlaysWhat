export class IncomingSong {
  public id? : number;
  public title : string = '';
  public score : number = 0;
  public link : string = '';
  public proposer : number;
  public musicians = [];

  constructor(proposer : number) {

  }
}

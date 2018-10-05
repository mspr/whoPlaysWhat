export class Musician
{
  public id? : number;
  public name : string = '';
  public roles: string[] = [];
  public bands;
  public color;

  static fromInfo(info)
  {
    let musician = new Musician();

    musician.name = info.name;
    musician.id = info._id;
    musician.roles = info.roles;
    musician.bands = info.bands;
    musician.color = info.color;

    return musician;
  }
}

export class Musician
{
  public id? : number;
  public name = '';
  public roles: string[] = [];
  public bands;
  public color;

  static fromJSON(info)
  {
    let musician = new Musician();

    musician.name = info.name;
    musician.id = info.id;
    musician.roles = info.roles;
    musician.bands = info.bands;
    musician.color = info.color;

    return musician;
  }
}

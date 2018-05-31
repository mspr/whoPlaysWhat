import { Musician } from './../musicians/musician';
import { Roles } from './roles.enum';

export class RolesHelper
{
  static getRoles()
  {
    return Object.keys(Roles);
  }

  static getRoleIconPath(role : Roles)
  {
    return "assets/images/roles/" + role.toLowerCase() + ".png";
  }

  static getRolesIconsPaths(musician : Musician) {
    var rolesIconsPaths : string[] = [];
    musician.roles.forEach(role => {
      rolesIconsPaths.push(RolesHelper.getRoleIconPath(Roles[role]));
    });
    return rolesIconsPaths;
  }
}

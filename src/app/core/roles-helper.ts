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
}

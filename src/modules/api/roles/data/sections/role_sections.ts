import { RolePermissions } from "../../roles.permissions";

export const roleSections = {
  key: 'role_menu',
  title: 'Role Menu',
  children: [
    {
      key: RolePermissions.ROLE_INDEX,
      title: 'Show All Role'
    },
    {
      key: RolePermissions.ROLE_CREATE,
      title: 'Create New Role'
    },
    {
      key: RolePermissions.ROLE_SHOW,
      title: 'Show Role Detail'
    },
    {
      key: RolePermissions.ROLE_UPDATE,
      title: 'Update Role Detail'
    },
    {
      key: RolePermissions.ROLE_DESTROY,
      title: 'Destroy Role'
    } 
  ]
}
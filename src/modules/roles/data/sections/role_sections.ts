import { RolePermissions } from "../../roles.permissions";

export const roleSections = {
  parent: {
    label: 'role_menu',
    description: 'Role Menu'
  },
  childs: [
    {
      label: RolePermissions.ROLE_INDEX,
      description: 'Show All Role'
    },
    {
      label: RolePermissions.ROLE_CREATE,
      description: 'Create New Role'
    },
    {
      label: RolePermissions.ROLE_SHOW,
      description: 'Show Role Detail'
    },
    {
      label: RolePermissions.ROLE_UPDATE,
      description: 'Update Role Detail'
    },
    {
      label: RolePermissions.ROLE_DESTROY,
      description: 'Destroy Role'
    } 
  ]
}
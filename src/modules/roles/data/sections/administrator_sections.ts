import { AdministratorPermissions } from "src/modules/administrators/administrators.permissions";

export const administratorSections = {
  parent: {
    label: 'administrator_menu',
    description: 'Administrator Menu'
  },
  childs: [
    {
      label: AdministratorPermissions.ADMINISTRATOR_INDEX,
      description: 'Show All Administrator'
    },
    {
      label: AdministratorPermissions.ADMINISTRATOR_SHOW,
      description: 'Show Administrator Detail'
    },
    {
      label: AdministratorPermissions.ADMINISTRATOR_UPDATE,
      description: 'Update Administrator Update'
    },
    {
      label: AdministratorPermissions.ADMINISTRATOR_CREATE,
      description: 'Create New Administrator'
    },
    {
      label: AdministratorPermissions.ADMINISTRATOR_DESTROY,
      description: 'Destroy Administrator'
    } 
  ]
}
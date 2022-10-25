import { AdministratorPermissions } from "src/modules/api/administrators/administrators.permissions";

export const administratorSections = {
  key: 'administrator_menu',
  title: 'Administrator Menu',
  children: [
    {
      key: AdministratorPermissions.ADMINISTRATOR_INDEX,
      title: 'Show All Administrator'
    },
    {
      key: AdministratorPermissions.ADMINISTRATOR_SHOW,
      title: 'Show Administrator Detail'
    },
    {
      key: AdministratorPermissions.ADMINISTRATOR_UPDATE,
      title: 'Update Administrator Update'
    },
    {
      key: AdministratorPermissions.ADMINISTRATOR_CREATE,
      title: 'Create New Administrator'
    },
    {
      key: AdministratorPermissions.ADMINISTRATOR_DESTROY,
      title: 'Destroy Administrator'
    } 
  ]
}
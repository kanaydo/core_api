import { administratorSections } from "./administrator_sections";
import { roleSections } from "./role_sections";

export const settingSections = {
  parent: {
    label: 'setting_menu',
    description: 'Setting Menu'
  },
  childs: [
    administratorSections,
    roleSections
  ]
}
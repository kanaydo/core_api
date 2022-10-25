import { administratorSections } from "./administrator_sections";
import { roleSections } from "./role_sections";
import { settingSections } from "./setting_sections";

// export const availableSections = [
//   settingSections
// ]

export const availableSections = [
  {
    title: 'System Setting',
    key: 'system_setting',
    children: [
      administratorSections,
      roleSections,
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
]
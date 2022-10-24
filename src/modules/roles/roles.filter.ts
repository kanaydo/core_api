import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleFilter {
  parse(filters: any): string {
    let filterQuery = "";
    if (!filters) return filterQuery;

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;

      let innerQuery = "";
      if (key === 'status') {
        const filterParams = value as Array<string>;
        const queryParams = filterParams.map(e => `\'${e}\'`);
        innerQuery = `role.${key} IN (${queryParams})`;
      }

      if (key === 'name') {
        innerQuery = `role.${key} LIKE \'%${value}%\'`;
      }

      if (key === 'createdAt') {
        const filterParams = value as Array<string>;
        if (filterParams.join('') != '') {
          const dStart = new Date(filterParams[0]);
          const dEnd = new Date(filterParams[1]);
          console.log(`role.createdAt BETWEEN \'${dStart.toISOString()}\' AND \'${dEnd.toISOString()}\'`);
          innerQuery = `role.createdAt BETWEEN \'${dStart.toISOString()}\' AND \'${dEnd.toISOString()}\'`;
        }

      }

      if (filterQuery === '') {
        filterQuery = innerQuery;
      } else if (filterQuery != '' && innerQuery != '') {
        filterQuery += ` AND ${innerQuery}`;
      }
    }
    return filterQuery;
  }
}
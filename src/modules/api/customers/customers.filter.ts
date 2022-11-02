import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerFilter {
  parse(filters: any): string {
    let filterQuery = "";
    if (!filters) return filterQuery;

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;

      let innerQuery = "";
      if (key === 'status') {
        const filterParams = value as Array<string>;
        const queryParams = filterParams.map(e => `\'${e}\'`);
        innerQuery = `cust.${key} IN (${queryParams})`;
      }

      if (key === 'firstName') {
        innerQuery = `LOWER(cust.first_name) LIKE LOWER(\'%${value}%\') OR LOWER(cust.last_name) LIKE LOWER(\'%${value}%\')`;
      }

      if (key == 'email') {
        innerQuery = `cust.email LIKE \'%${value}%\'`;
      }

      if (key === 'createdAt') {
        const filterParams = value as Array<string>;
        if (filterParams.join('') != '') {
          const dStart = new Date(filterParams[0]);
          const dEnd = new Date(filterParams[1]);
          console.log(`cust.createdAt BETWEEN \'${dStart.toISOString()}\' AND \'${dEnd.toISOString()}\'`);
          innerQuery = `cust.createdAt BETWEEN \'${dStart.toISOString()}\' AND \'${dEnd.toISOString()}\'`;
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
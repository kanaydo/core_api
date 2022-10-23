import { Injectable } from "@nestjs/common";

@Injectable()
export class AdministratorsFilterService {
  parse(filters: any): string {
    let filterQuery = "";
    if (!filters) return filterQuery;

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;

      let innerQuery = "";
      if (key === 'status') {
        const filterParams = value as Array<string>;
        const queryParams = filterParams.map(e => `\'${e}\'`);
        innerQuery = `admin.${key} IN (${queryParams})`;
      }
      
      if (key === 'username') {
        innerQuery = `admin.${key} LIKE \'%${value}%\'`;
      }

      if (filterQuery === '') {
        filterQuery = innerQuery;
      } else {
        filterQuery += ` AND ${innerQuery}`;
      }
    }
    return filterQuery;
  }
}
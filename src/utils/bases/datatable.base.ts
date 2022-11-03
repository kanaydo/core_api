import { camelToSnakeCase } from "../case";
import { DatatableCondition } from "../enums/datatable.enum";

export default class BaseDatatable {
  constructor(public rules: any, public alias: string) {
    this.rules = rules;
    this.alias = alias;
  }

  private anyQuery(key: any, term: any) {
    const filterParams = term as Array<string>;
    const queryParams = filterParams.map(e => `\'${e}\'`);
    return `${this.alias}.${key} IN (${queryParams})`;
  }

  private equalQuery(key: any, term: any) {
    return `${this.alias}.${key} = (${term})`;
  }

  private likeQuery(key: any, term: any) {
    return `LOWER(${this.alias}.${key}) LIKE LOWER(\'%${term}%\')`;
  }

  private rangeQuery(key: any, term: any) {
    const filterParams = term as Array<string>;
    const dStart = new Date(filterParams[0]);
    const dEnd = new Date(filterParams[1]);
    return `${this.alias}.${key} BETWEEN \'${dStart.toISOString()}\' AND \'${dEnd.toISOString()}\'`;
  }

  private buildConditonQuery(cond: any, term: any, key: any) {
    switch(cond) { 
      case DatatableCondition.EQUAL: { 
        return this.equalQuery(key, term); 
      } 
      case DatatableCondition.ANY: { 
        return this.anyQuery(key, term);
      }
      case DatatableCondition.LIKE: { 
        return this.likeQuery(key, term);
      }
      case DatatableCondition.RANGE: { 
        return this.rangeQuery(key, term);
      } 
      default: { 
        return '';
      } 
    } 
  } 

  getQueryString(filters: any) : string {
    let query = '';
    for (const [key, value] of Object.entries(this.rules)) {
      const term = filters[key];
      if (!term) continue;

      const tKey = camelToSnakeCase(key);
      const condition = this.buildConditonQuery(value, term, tKey);
      if (condition === '') continue;

      if (query === '') {
        query += condition;
      } else {
        query += ` AND ${condition}`
      }
    }
    return query;
  }
}
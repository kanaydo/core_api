import { camelToSnakeCase } from "../case";
import { DatatableCondition } from "../enums/datatable.enum";

export interface BaseDatatableProps {
  alias: string
  rules: any,
  relationsRule?: any
}

export default class BaseDatatable {
  alias: string;
  rules: any;
  relationsRule?: any

  constructor(public props: BaseDatatableProps) {
    this.rules = props.rules;
    this.alias = props.alias;
    this.relationsRule = props.relationsRule;
  }

  private anyQuery(key: any, term: any, tAlias: any) {
    const filterParams = term as Array<string>;
    const queryParams = filterParams.map(e => `\'${e}\'`);
    return `${tAlias}.${key} IN (${queryParams})`;
  }

  private equalQuery(key: any, term: any, tAlias: any) {
    return `${tAlias}.${key} = (${term})`;
  }

  private likeQuery(key: any, term: any, tAlias: any) {
    return `LOWER(${tAlias}.${key}) LIKE LOWER(\'%${term}%\')`;
  }

  private rangeQuery(key: any, term: any, tAlias: any) {
    const filterParams = term as Array<string>;
    const dStart = new Date(filterParams[0]);
    const dEnd = new Date(filterParams[1]);
    return `${tAlias}.${key} BETWEEN \'${dStart.toISOString()}\' AND \'${dEnd.toISOString()}\'`;
  }

  private buildConditonQuery(term: any, key: any) {
    const isAssociation = this.isAssociationField(key);
    let condition = this.rules[key];
    let tableAlias = this.alias;
    let fieldKey = key;

    if (isAssociation) {
      const assoc = this.relationsRule[key];
      condition = assoc?.cond;
      tableAlias = assoc?.alias;
      fieldKey = assoc?.field;
    }

    console.log(condition, tableAlias, fieldKey);

    switch (condition) {
      case DatatableCondition.EQUAL: {
        return this.equalQuery(fieldKey, term, tableAlias);
      }
      case DatatableCondition.ANY: {
        return this.anyQuery(fieldKey, term, tableAlias);
      }
      case DatatableCondition.LIKE: {
        return this.likeQuery(fieldKey, term, tableAlias);
      }
      case DatatableCondition.RANGE: {
        return this.rangeQuery(fieldKey, term, tableAlias);
      }
      default: {
        return '';
      }
    }
  }

  private isAssociationField(key: any) : boolean {
    return key in this.relationsRule;
  }

  private isHandledField(key: any): boolean {
    const isEntityField = key in this.rules;
    const isRelationField = key in this.relationsRule;
    return isEntityField || isRelationField;
  }

  getQueryString(filters: any): string {
    let query = '';
    for (const [key, value] of Object.entries(filters)) {
      if (value === '') continue;

      const cond = this.isHandledField(key);
      if (!cond) continue;

      const condition = this.buildConditonQuery(value, key);
      if (condition === '') continue;

      if (query === '') {
        query += condition;
      } else {
        query += ` AND ${condition}`
      }

    }
    console.log(query);
    return query;
  }
}
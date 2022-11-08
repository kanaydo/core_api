import { Injectable } from "@nestjs/common";
import BaseDatatable from "src/utils/bases/datatable.base";
import { DatatableCondition } from "src/utils/enums/datatable.enum";

@Injectable()
export class CustomerDatatable extends BaseDatatable {
  constructor() { 
    super({
      alias: "cust",
      rules: {
        status:  DatatableCondition.ANY,
        firstName: DatatableCondition.LIKE,
        email: DatatableCondition.LIKE,
        phone: DatatableCondition.LIKE,
        address: DatatableCondition.LIKE,
        createdAt: DatatableCondition.RANGE
      },
      relationsRule: {
        administrator: {
          alias: 'admin',
          field: 'username',
          cond: DatatableCondition.LIKE
        }
      }  
    });
  }

  build(filters: any) {
    if (!filters) return '';
    return this.getQueryString(filters);
  }
}
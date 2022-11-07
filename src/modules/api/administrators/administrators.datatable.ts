import { Injectable } from "@nestjs/common";
import BaseDatatable from "src/utils/bases/datatable.base";
import { DatatableCondition } from "src/utils/enums/datatable.enum";

@Injectable()
export class AdministratorsDatatable extends BaseDatatable {
  constructor() {
    super({
      alias: "admin",
      rules: {
        status:  DatatableCondition.ANY,
        username: DatatableCondition.LIKE,
        createdAt: DatatableCondition.RANGE
      }
    });
  }

  build(filters: any) {
    if (!filters) return '';
    return this.getQueryString(filters);
  }
}
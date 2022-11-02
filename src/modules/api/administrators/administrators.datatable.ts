import { Injectable } from "@nestjs/common";
import BaseDatatable from "src/utils/bases/datatable.base";
import { DatatableCondition } from "src/utils/enums/datatable.enum";

@Injectable()
export class AdministratorsDatatable extends BaseDatatable {
  constructor() {
    super({
      status:  DatatableCondition.ANY,
      username: DatatableCondition.LIKE,
      createdAt: DatatableCondition.RANGE
    }, "admin");
  }

  build(filters: any) {
    if (!filters) return '';
    return this.getQueryString(filters);
  }
}
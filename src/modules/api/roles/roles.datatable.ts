import { Injectable } from "@nestjs/common";
import BaseDatatable from "src/utils/bases/datatable.base";
import { DatatableCondition } from "src/utils/enums/datatable.enum";

@Injectable()
export class RoleDatatable extends BaseDatatable {
  constructor() {
    super({
      status:  DatatableCondition.ANY,
      name: DatatableCondition.LIKE,
      createdAt: DatatableCondition.RANGE
    }, "role");
  }

  build(filters: any) {
    if (!filters) return '';
    return this.getQueryString(filters);
  }
}
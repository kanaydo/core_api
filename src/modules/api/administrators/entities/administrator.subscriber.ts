// import { CACHE_MANAGER, Inject } from "@nestjs/common";
// import { Cache } from 'cache-manager';
// import { Role } from "src/modules/roles/entities/role.entity";
// import { EntitySubscriberInterface, EventSubscriber, In, InsertEvent, UpdateEvent } from "typeorm"
// import { Administrator } from "./administrator.entity"

// @EventSubscriber()
// export class AdministratorSubscriber implements EntitySubscriberInterface<Administrator> {
//   constructor(
//     @Inject(CACHE_MANAGER) private cacheManager: Cache
//   ) { }

//   listenTo() {
//     return Administrator
//   }

//   async afterUpdate(event: UpdateEvent<Administrator>): Promise<void> {

//   }
// }
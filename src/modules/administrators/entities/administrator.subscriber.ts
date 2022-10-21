import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from 'cache-manager';
import { Role } from "src/modules/roles/entities/role.entity";
import { EntitySubscriberInterface, EventSubscriber, In, InsertEvent, UpdateEvent } from "typeorm"
import { Administrator } from "./administrator.entity"

@EventSubscriber()
export class AdministratorSubscriber implements EntitySubscriberInterface<Administrator> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  listenTo() {
    return Administrator
  }

  async afterUpdate(event: UpdateEvent<Administrator>): Promise<void> {
    // const { entity, manager } = event;
    // if (!entity) return;

    // const roleRepository = manager.getRepository(Role);
    // const roles = await roleRepository.find({
    //   where: {
    //     id: In(entity.roleList)
    //   }
    // });

    // const sections = roles.map((r) => r.sections).flat();
    // const uniqueSection = [...new Set(sections)];
    // await this.cacheManager.set(`ADMIN_SECTION_${entity.id}`, uniqueSection);
  }
}
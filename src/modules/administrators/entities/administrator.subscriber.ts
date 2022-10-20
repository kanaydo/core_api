import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm"
import { Administrator } from "./administrator.entity"

@EventSubscriber()
export class AdministratorSubscriber implements EntitySubscriberInterface<Administrator> {
    listenTo() {
        return Administrator
    }
    afterUpdate(event: UpdateEvent<Administrator>) {
      console.log(`AFTER ENTITY UPDATED: `, event.entity)
  }
}
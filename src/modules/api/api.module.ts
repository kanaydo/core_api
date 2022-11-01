import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core';
import { RolesGuard } from 'src/guard/roles.guard';
import { AdministratorsModule } from 'src/modules/api/administrators/administrators.module';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesModule } from './roles/roles.module';
import { WorkUnitModule } from './work_unit/work_unit.module';
import { CustomersModule } from './customers/customers.module';
import { QueryFailedExceptionFilter } from 'src/utils/query_failed_exception.filter';

@Module({
  imports: [
    AdministratorsModule,
    RolesModule,
    AuthModule,
    WorkUnitModule,
    CustomersModule,
    RouterModule.register([
      {
        path: 'api',
        module: RolesModule
      },
      {
        path: 'api',
        module: AdministratorsModule
      },
      {
        path: 'api',
        module: WorkUnitModule
      },
      {
        path: 'api',
        module: CustomersModule
      }
    ]),
    
  ],
  controllers: [
    ApiController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter
    }
  ]
})

export class ApiModule {

}

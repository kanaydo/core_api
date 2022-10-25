import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { RolesGuard } from 'src/guard/roles.guard';
import { AdministratorsModule } from 'src/modules/api/administrators/administrators.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    AdministratorsModule,
    RolesModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        module: RolesModule
      },
      {
        path: 'api',
        module: AdministratorsModule
      }
    ])
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class ApiModule {

}

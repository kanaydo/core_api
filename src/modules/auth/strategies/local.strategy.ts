import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AdministratorEntity } from 'src/modules/administrators/entities/administrator.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<AdministratorEntity> {
    const administrator = await this.authService.validateAdministrator(username, password);
    if (!administrator) {
      throw new UnauthorizedException();
    }
    return administrator;
  }
}
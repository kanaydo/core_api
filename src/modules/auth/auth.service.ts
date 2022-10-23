import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { AdministratorEntity } from '../administrators/entities/administrator.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdministratorEntity)
    private administratorRepository: Repository<AdministratorEntity>,
    private jwtService: JwtService
  ) {}

  async validateAdministrator(username: string, pass: string): Promise<AdministratorEntity | null> {
    const user = await this.administratorRepository.findOneBy({username: username});
    if (user) {
      const validPass = await bcrypt.compare(pass, user.passwordDigest);
      if (validPass) {
        return user;
      } else {
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const serializedUser = instanceToPlain<AdministratorEntity>(user);
    return {
      access_token: this.jwtService.sign(payload),
      administrator: serializedUser
    };
  }
}

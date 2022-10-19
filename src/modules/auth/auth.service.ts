import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Administrator } from '../administrators/entities/administrator.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>,
    private jwtService: JwtService
  ) {}

  async validateAdministrator(username: string, pass: string): Promise<any> {
    const user = await this.administratorRepository.findOneBy({username: username});
    if (user) {
      const validPass = await bcrypt.compare(pass, user.passwordDigest);
      if (validPass) {
        const jwtToken = await this.login(user);
        return jwtToken;
      }
      return null;
    }
    return null;
  }

  async login(administrator: Administrator) {
    const payload = { username: administrator.username, sub: administrator.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

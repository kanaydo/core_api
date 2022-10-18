import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(newRole);
    return newRole;
  }

  findAll() : Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number) : Promise<Role | null> {
    return await this.roleRepository.findOneByOrFail({id: id});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) : Promise<Role | null> {
    const result = await this.roleRepository.update(id, updateRoleDto);
    if (result.affected) {
      const updatedRole = await this.roleRepository.findOneBy({id: id});
      return updatedRole;
    }
    throw new HttpException('failed to update', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async remove(id: number) {
    const destroyRole = await this.roleRepository.delete(id);
    if (destroyRole.affected) {
      return {
        message: 'successfully removed'
      };
    } else {
      throw new HttpException('failed to remove', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}

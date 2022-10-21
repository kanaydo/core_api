import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(Administrator) private administratorRepository: Repository<Administrator>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(createAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    const hashedPassword = await bcrypt.hash(createAdministratorDto.password, 10);
    createAdministratorDto.passwordDigest = hashedPassword;
    const newTodo = this.administratorRepository.create(createAdministratorDto);
    await this.administratorRepository.save(newTodo);

    return newTodo;
  }

  findAll(): Promise<Administrator[]> {
    return this.administratorRepository.find();
  }

  findOne(id: number): Promise<Administrator | null> {
    return this.administratorRepository.findOneBy({ id });
  }

  async update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    const result = await this.administratorRepository.update(id, updateAdministratorDto);
    if (result.affected) {
      const updatedAdministrator = await this.administratorRepository.findOneBy({id: id});
      return updatedAdministrator;
    }
    throw new HttpException('failed to update', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async remove(id: number): Promise<void> {
    await this.administratorRepository.delete(id);
  }

  async getRoles(id: number) : Promise<string[]> {
    const admin = await this.administratorRepository.findOneBy({ id });
    if (!admin) return [];

    return this.getCachedSections(admin);
  }

  async getCachedSections(administrator: Administrator) : Promise<string[]> {
    const cachedSections = await this.cacheManager.get(`ADMIN_SECTION_${administrator.id}`);
    if (cachedSections) return cachedSections as string[];

    const roles = await this.roleRepository.find({
      where: {
        id: In(administrator.roleList) 
      }
    });

    const sections = roles.map((r) => r.sections).flat();
    const uniqueSection = [...new Set(sections)];
    await this.cacheManager.set(`ADMIN_SECTION_${administrator.id}`, uniqueSection);
    return uniqueSection;
  }
}

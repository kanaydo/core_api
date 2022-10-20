import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
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

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  async remove(id: number): Promise<void> {
    await this.administratorRepository.delete(id);
  }

  async getRoles(id: number) : Promise<string[]> {
    const admin = await this.administratorRepository.findOneBy({ id });
    if (!admin) return [];
    const roles = await this.roleRepository.find({
      where: {
        id: In(admin.roleList) 
      }
    });
    const currentCached = await this.cacheManager.get(`ADMIN_SECTION_${id}`);
    console.log('current cache =====================> ', currentCached);

    await this.cacheManager.set(`ADMIN_SECTION_${id}`, 'uniqueSection');
    const cachedSections = await this.cacheManager.get(`ADMIN_SECTION_${id}`);
    console.log('current cache =====================> ', cachedSections);
    
    const sections = roles.map((r) => r.sections).flat();
    const uniqueSection = [...new Set(sections)];
    return uniqueSection;
  }
}

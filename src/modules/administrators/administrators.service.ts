import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, In, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorEntity } from './entities/administrator.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(AdministratorEntity) private administratorRepository: Repository<AdministratorEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(createAdministratorDto: CreateAdministratorDto): Promise<AdministratorEntity> {
    const hashedPassword = await bcrypt.hash(createAdministratorDto.password, 10);
    createAdministratorDto.passwordDigest = hashedPassword;
    const newTodo = this.administratorRepository.create(createAdministratorDto);
    await this.administratorRepository.save(newTodo);

    return newTodo;
  }

  findAll(): Promise<AdministratorEntity[]> {
    return this.administratorRepository.find();
  }

  findOne(id: number): Promise<AdministratorEntity | null> {
    return this.administratorRepository.findOneBy({ id });
  }

  async update(id: number, updateAdministratorDto: UpdateAdministratorDto) : Promise<AdministratorEntity> {
    const current = await this.administratorRepository.findOneBy({id: id});
    const updateAdministratorParams = { ...current, ...updateAdministratorDto };
    const result = await this.administratorRepository.save(updateAdministratorParams);
    this.invalidateCachedSections(result);
    const updatedAdmin = result as AdministratorEntity;
    return updatedAdmin;
  }

  async remove(id: number): Promise<void> {
    await this.administratorRepository.delete(id);
  }

  async getRoles(id: number) : Promise<string[]> {
    const cachedSections = await this.cacheManager.get(`ADMIN_SECTION_${id}`);
    if (cachedSections) return cachedSections as string[];

    const admin = await this.administratorRepository.findOneBy({ id });
    if (!admin) return [];

    return this.invalidateCachedSections(admin);
  }

  async invalidateCachedSections(administrator: AdministratorEntity) : Promise<string[]> {
    console.log('===============================> invalidating cached section')
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

  async paginate(options: IPaginationOptions): Promise<Pagination<AdministratorEntity>> {
    return paginate<AdministratorEntity>(this.administratorRepository, options);
  }
}

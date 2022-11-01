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
import { CorePagingOrder } from './entities/core_paging_order.interface';
import { AdministratorsFilterService } from './administrators.filter.service';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(AdministratorEntity) private administratorRepository: Repository<AdministratorEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly filterService: AdministratorsFilterService
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

  findOne(id: string): Promise<AdministratorEntity | null> {
    return this.administratorRepository.findOneBy({ id });
  }

  async update(id: string, updateAdministratorDto: UpdateAdministratorDto) : Promise<AdministratorEntity> {
    const current = await this.administratorRepository.findOneBy({id: id});
    if (updateAdministratorDto.password) {
      const hashedPassword = await bcrypt.hash(updateAdministratorDto.password, 10);
      updateAdministratorDto.passwordDigest = hashedPassword;
    }
    const updateAdministratorParams = { ...current, ...updateAdministratorDto };
    const result = await this.administratorRepository.save(updateAdministratorParams);
    this.invalidateCachedSections(result);
    const updatedAdmin = result as AdministratorEntity;
    return updatedAdmin;
  }

  async remove(id: string): Promise<void> {
    await this.administratorRepository.delete(id);
  }

  async getRoles(id: string) : Promise<string[]> {
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

  async paginate(options: IPaginationOptions, order: CorePagingOrder): Promise<Pagination<AdministratorEntity>> {
    const queryBuilder = this.administratorRepository.createQueryBuilder('admin');

    console.log('params ==================>', order);

    if (order.order && order.field) {
      const orderTerm = order.order == 'ascend' ? 'ASC' : 'DESC';
      queryBuilder.orderBy(`admin.${order.field}`, orderTerm);
    } else {
      queryBuilder.orderBy(`admin.id`, 'ASC');
    }

    const filterQuery = this.filterService.parse(order.filters);
    console.log('query ===============================>', filterQuery);
    queryBuilder.where(filterQuery);
    return paginate<AdministratorEntity>(queryBuilder, options);
  }
}

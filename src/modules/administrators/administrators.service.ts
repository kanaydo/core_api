import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>
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
}

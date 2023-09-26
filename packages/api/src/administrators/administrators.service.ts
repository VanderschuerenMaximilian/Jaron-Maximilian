import { Injectable } from '@nestjs/common';
import { CreateAdministratorInput } from './dto/create-administrator.input';
import { UpdateAdministratorInput } from './dto/update-administrator.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorsService {

  constructor(
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>,
  ) {}

  create(createAdministratorInput: CreateAdministratorInput) {
    const administrator = new Administrator();
    administrator.firstname = createAdministratorInput.firstname;
    administrator.lastname = createAdministratorInput.lastname;
    administrator.email = createAdministratorInput.email;
    return this.administratorRepository.save(administrator);
  }

  findAll() {
    return this.administratorRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorInput: UpdateAdministratorInput) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }

  // seeding logic
}

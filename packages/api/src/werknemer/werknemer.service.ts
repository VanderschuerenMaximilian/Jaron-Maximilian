import { Injectable } from '@nestjs/common';
import { CreateWerknemerInput } from './dto/create-werknemer.input';
import { UpdateWerknemerInput } from './dto/update-werknemer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Werknemer } from './entities/werknemer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WerknemerService {

  constructor(
    @InjectRepository(Werknemer)
    private werknemerRepository: Repository<Werknemer>,
  ) 
  {}

  create(createWerknemerInput: CreateWerknemerInput) {
    return 'This action adds a new werknemer';
  }

  findAll() {
    return this.werknemerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} werknemer`;
  }

  update(id: number, updateWerknemerInput: UpdateWerknemerInput) {
    return `This action updates a #${id} werknemer`;
  }

  remove(id: number) {
    return `This action removes a #${id} werknemer`;
  }
}

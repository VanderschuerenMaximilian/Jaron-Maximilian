import { Injectable } from '@nestjs/common';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BezoekerService {
  constructor(
    @InjectRepository(Bezoeker)
    private readonly bezoekerRepository: Repository<Bezoeker>,
  ) {}
  
  create(createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker> {
    const b = new Bezoeker()
    b.name = createBezoekerInput.name
    b.fullname = createBezoekerInput.fullname
    b.email = createBezoekerInput.email
    return this.bezoekerRepository.save(b)
  }

  findAll() {
    return `This action returns all bezoeker`
  }

  findOne(id: number) {
    return `This action returns a #${id} bezoeker`
  }

  update(id: number, updateBezoekerInput: UpdateBezoekerInput) {
    return `This action updates a #${id} bezoeker`
  }

  remove(id: number) {
    return `This action removes a #${id} bezoeker`
  }
}

import { Injectable } from '@nestjs/common';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';

@Injectable()
export class BezoekerService {
  create(createBezoekerInput: CreateBezoekerInput) {
    return 'This action adds a new bezoeker';
  }

  findAll() {
    return `This action returns all bezoeker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bezoeker`;
  }

  update(id: number, updateBezoekerInput: UpdateBezoekerInput) {
    return `This action updates a #${id} bezoeker`;
  }

  remove(id: number) {
    return `This action removes a #${id} bezoeker`;
  }
}

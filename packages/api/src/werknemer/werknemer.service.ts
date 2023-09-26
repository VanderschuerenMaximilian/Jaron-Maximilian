import { Injectable } from '@nestjs/common';
import { CreateWerknemerInput } from './dto/create-werknemer.input';
import { UpdateWerknemerInput } from './dto/update-werknemer.input';

@Injectable()
export class WerknemerService {
  create(createWerknemerInput: CreateWerknemerInput) {
    return 'This action adds a new werknemer';
  }

  findAll() {
    // return `This action returns all werknemers`;
    return [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@werknemer.bellewaerde.be',
      }
    ]
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

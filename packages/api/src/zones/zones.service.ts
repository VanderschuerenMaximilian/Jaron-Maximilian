import { Injectable } from '@nestjs/common';
import { CreateZoneInput } from './dto/create-zone.input';
import { UpdateZoneInput } from './dto/update-zone.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  create(createZoneInput: CreateZoneInput) {
    try {
      const z = new Zone()
      z.name = createZoneInput.name
      z.description = createZoneInput.description
      z.createdAt = new Date()
      z.updatedAt = new Date()

      return this.zoneRepository.save(z)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.zoneRepository.find()
  }

  findOne(id: string) {
      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      // @ts-ignore
      return this.zoneRepository.findOne({ _id: new ObjectId(id) })
  }

  // update(id: number, updateZoneInput: UpdateZoneInput) {
  //   return `This action updates a #${id} zone`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} zone`;
  // }

  // functions for seeding

  async saveAllZones(zones: Zone[]) {
    return await this.zoneRepository.save(zones)
  }

  async truncate () {
    return await this.zoneRepository.clear()
  }
}

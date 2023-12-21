import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesResolver } from './zones.resolver';
import { Zone } from './entities/zone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Zone]),
    PersonsModule,
  ],
  providers: [ZonesResolver, ZonesService],
  exports: [ZonesService]
})

export class ZonesModule {}

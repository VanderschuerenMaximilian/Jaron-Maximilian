import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesResolver } from './zones.resolver';
import { Zone } from './entities/zone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Zone]),
  ],
  providers: [ZonesResolver, ZonesService],
  exports: [ZonesService]
})

export class ZonesModule {}

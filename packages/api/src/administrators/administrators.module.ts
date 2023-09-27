import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsResolver } from './administrators.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';

@Module({
  providers: [AdministratorsResolver, AdministratorsService],
  imports: [TypeOrmModule.forFeature([Administrator])],

  exports: [AdministratorsService],
})
export class AdministratorsModule {}

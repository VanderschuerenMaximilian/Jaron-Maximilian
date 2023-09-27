import { Module } from '@nestjs/common';
import { WerknemerService } from './werknemer.service';
import { WerknemerResolver } from './werknemer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Werknemer } from './entities/werknemer.entity';

@Module({
  providers: [WerknemerResolver, WerknemerService],
  imports: [TypeOrmModule.forFeature([Werknemer])],

  exports: [WerknemerService],
})
export class WerknemerModule {}

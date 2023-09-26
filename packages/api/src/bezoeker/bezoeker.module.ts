import { Module } from '@nestjs/common';
import { BezoekerService } from './bezoeker.service';
import { BezoekerResolver } from './bezoeker.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bezoeker } from './entities/bezoeker.entity';

@Module({
  providers: [BezoekerResolver, BezoekerService],
  imports: [TypeOrmModule.forFeature([Bezoeker])],
  exports: [BezoekerService],
})
export class BezoekerModule {}

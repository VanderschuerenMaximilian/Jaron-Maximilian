import { Module } from '@nestjs/common';
import { BezoekerService } from './bezoeker.service';
import { BezoekerResolver } from './bezoeker.resolver';

@Module({
  providers: [BezoekerResolver, BezoekerService],
})
export class BezoekerModule {}

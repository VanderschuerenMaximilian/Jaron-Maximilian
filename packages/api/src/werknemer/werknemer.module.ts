import { Module } from '@nestjs/common';
import { WerknemerService } from './werknemer.service';
import { WerknemerResolver } from './werknemer.resolver';

@Module({
  providers: [WerknemerResolver, WerknemerService],
})
export class WerknemerModule {}

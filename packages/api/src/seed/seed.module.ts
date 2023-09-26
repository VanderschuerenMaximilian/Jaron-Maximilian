import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { WerknemerModule } from 'src/werknemer/werknemer.module';
import { SeedService } from './seed.service';

@Module({
    imports: [WerknemerModule, CommandModule],
    providers: [SeedService],
})
export class SeedModule {}

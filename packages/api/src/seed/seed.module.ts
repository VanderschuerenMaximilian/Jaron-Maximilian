import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { WerknemerModule } from 'src/werknemer/werknemer.module';
import { BezoekerModule } from 'src/bezoeker/bezoeker.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';

@Module({
    imports: [WerknemerModule, BezoekerModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}

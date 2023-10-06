import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PersonsModule } from 'src/persons/persons.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { AlertsModule } from 'src/alerts/alerts.module';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
    imports: [PersonsModule, AlertsModule, ShopsModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}

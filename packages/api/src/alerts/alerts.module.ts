import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsResolver } from './alerts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    PersonsModule,
  ],
  providers: [AlertsResolver, AlertsService],
  exports: [AlertsService]
})
export class AlertsModule {}

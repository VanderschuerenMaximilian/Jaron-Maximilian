// import { Module } from '@nestjs/common';
// import { AlertsService } from './alerts.service';
// import { AlertsResolver } from './alerts.resolver';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Alert } from './entities/alert.entity';
// import { PersonsModule } from 'src/persons/persons.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Alert]),
//     PersonsModule,
//   ],
//   providers: [AlertsResolver, AlertsService],
//   exports: [AlertsService]
// })
// export class AlertsModule {}

import { Module } from '@nestjs/common';
import { PersonsService } from 'src/persons/persons.service';
import { PersonsModule } from 'src/persons/persons.module'; // Make sure to import the PersonsModule or relevant module
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    PersonsModule, // Include the PersonsModule or relevant module
  ],
  providers: [
    AlertsService,
    PersonsService,
    // PersonsRepository, // Include the PersonsRepository or relevant repository
  ],
})
export class AlertsModule {}

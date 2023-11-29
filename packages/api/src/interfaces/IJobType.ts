import { registerEnumType } from '@nestjs/graphql';

export enum JobType {
    CLEANER = 'CLEANER',
    SHOPKEEPER = 'SHOPKEEPER',
    ATTRACTION_OPERATOR = 'ATTRACTION_OPERATOR',
}

registerEnumType(JobType, {
  name: 'JobType',
});
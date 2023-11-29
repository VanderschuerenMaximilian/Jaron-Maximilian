import { registerEnumType } from '@nestjs/graphql';

export enum PersonType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  VISITOR = 'VISITOR',
}

registerEnumType(PersonType, {
  name: 'PersonType',
});

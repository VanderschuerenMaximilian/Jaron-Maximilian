import { registerEnumType } from "@nestjs/graphql";

export enum AlertState {
    OPEN = 'OPEN',
    ACKNOWLEDGED = 'ACKNOWLEDGED',
    RESOLVED = 'RESOLVED',
}

registerEnumType(AlertState, {
  name: 'AlertState',
});
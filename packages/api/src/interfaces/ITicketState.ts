import { registerEnumType } from "@nestjs/graphql";

export enum TicketState {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    USED = "USED",
}

registerEnumType(TicketState, {
  name: 'TicketState',
});
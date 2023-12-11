import { gql, type TypedDocumentNode } from "@apollo/client/core";
import type { Alert as IAlert } from "@/interfaces/IAlert";

export const ALL_ALERTS: TypedDocumentNode<{ alerts: IAlert[] }> = gql`
    query {
        alerts {
            id
            title
            description
            zoneId
            state
            persons {
                id
                firstName
                lastName
                fullName
                personalEmail
                workEmail
                phone
                personType
                jobType
            }
            createdBy
    }
    }
`;

export const ALL_NON_ASSIGNED_ALERTS: TypedDocumentNode<{ nonAssignedAlerts: IAlert[] }> = gql`
query nonAssignedAlerts {
    nonAssignedAlerts {
        id
        title
        description
        zoneId
        state
        assignedPersonId
        persons {
            id
            firstName
            lastName
            fullName
            workEmail
            phone
            jobType
        }
    }
}
`;

export const FIND_ALERT_BY_ID: TypedDocumentNode<{ alert: IAlert }> = gql`
    query alertById($alertId: String!) {
        alert (id: $alertId) {
            id
            title
            description
            zoneId
            state
            persons {
                id
                firstName
                lastName
            }
        }
    }
`;

export const GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE: TypedDocumentNode<{ nonResolvedAlertsByEmployee: IAlert[] }> = gql`
query nonResolvedAlertsByEmployee($employeeId: String!) {
  nonResolvedAlertsByEmployee(employeeId: $employeeId) {
	id
    title
    description
    zoneId
    state
    persons {
      id
      firstName
      lastName
      fullName
      workEmail
      phone
      jobType
    }
  }
}`;

export const GET_NON_RESOLVED_ALERTS_FROM_CREATED_BY: TypedDocumentNode<{ nonResolvedAlertsByCreatedBy: IAlert[] }> = gql`
query nonResolvedAlertsByCreatedBy($createdBy: String!) {
  nonResolvedAlertsByCreatedBy(createdBy: $createdBy) {
    id
    title
    description
    state
    zoneId
    createdBy
  }
}
`;
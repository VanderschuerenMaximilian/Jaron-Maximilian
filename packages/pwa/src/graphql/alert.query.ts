import gql from 'graphql-tag';

export const ALL_ALERTS = gql`
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

export const ALL_NON_ASSIGNED_ALERTS = gql`
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

export const FIND_ALERT_BY_ID = gql`
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

export const GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE = gql`
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
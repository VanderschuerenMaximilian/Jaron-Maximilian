import gql from 'graphql-tag';

export const UPDATED_TASKS = gql`
    subscription tasksUpdated {
        tasksUpdated {
            id
            persons { id, fullName, profilePicture }
            workblockId
            title
            description
            completed
            createdAt
            shopName
            stockItems {
                name
                difference
            }
        }
    }
`;

export const ADDED_TASKS = gql`
    subscription taskAdded {
        taskAdded {
            id
            persons { id, fullName, profilePicture }
            workblockId
            title
            description
            completed
            createdAt
            shopName
            stockItems {
                name
                difference
            }
        }
    }
`;
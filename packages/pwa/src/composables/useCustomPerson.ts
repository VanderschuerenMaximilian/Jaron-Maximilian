import { useQuery, provideApolloClient } from '@vue/apollo-composable';
import { FIND_PERSON_BY_UID } from '../graphql/person.query';
import { ref } from 'vue';
import useFirebase from './useFirebase';
import useGraphql from './useGraphql';
import type { Person } from '@/interfaces/IPersons'

const customPerson = ref<Person>();

const { firebaseUser } = useFirebase();
const { apolloClient } = useGraphql();

provideApolloClient(apolloClient)

const restoreCustomPerson = async () => {
    return new Promise<void>(resolve => {
        const { onResult } = useQuery(FIND_PERSON_BY_UID, {
            uid: firebaseUser.value?.uid
        })
        onResult((result) => {
            if (result.data){
                customPerson.value = result.data?.personByUid
                console.log('customPerson: ', customPerson.value)
                resolve()
            }
        })
    })
}

export default () => {

    return {
        customPerson,
        restoreCustomPerson,
    }
}
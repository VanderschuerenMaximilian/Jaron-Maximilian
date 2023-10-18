<template>
        <template v-if="firebaseUser">
            <main class="pt-[70px] mb-8">
                <h2 class="h2-green text-center my-12">Make an Alert</h2>
                <form @submit.prevent="handleSubmitAlert" class="grid grid-cols-1 max-w-lg mx-auto gap-6">

                    <div v-show="isCreated" class="mx-auto p-4 bg-light-green bg-opacity-30 border-primary-green border-3 mt-3 max-w-sm rounded-lg">
                        <p class="text-center font-medium text-primary-green">Er is een opmerking gestuurd, bedankt voor uw hulp!</p>
                    </div>

                    <div class="flex flex-col max-w-lg">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" v-model="newAlert.title">
                    </div>

                    <div class="flex flex-col max-w-lg">
                        <label for="description">What is the problem?</label>
                        <textarea name="description" id="description" cols="30" rows="5" v-model="newAlert.description"></textarea>
                    </div>

                    <div class="w-full flex justify-center">
                        <button type="submit" :disabled="loading"
                        class="bg-secondary-green hover:bg-primary-green px-4 py-2 w-[250px] rounded-sm 
                        text-slate-100 disabled:bg-opacity-40">
                        Submit</button>
                    </div>
                </form>
            </main>
        </template>
        <template v-else>
            <main class="pt-[70px]">
                <h2 class="h2-green text-center mb-12">Make an Alert</h2>
                <p>log in aub</p>
            </main>
        </template>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '../composables/useFirebase'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ALERT } from '@/graphql/alert.mutation'
import type { Alert } from '@/interfaces/IAlert'


export default {
    components: {
        
    },
    setup() {
        const { firebaseUser } = useFirebase()
        const newAlert = ref<Alert>({
            title: '',
            description: '',
        })
        const isCreated = ref<boolean>(false)
        const { mutate: createAlert, loading } = useMutation(CREATE_ALERT)
        
        const handleSubmitAlert = () => {
            createAlert({ createAlertInput: 
                {
                    title: newAlert.value.title,
                    description: newAlert.value.description,
                    // TODO: change the uid to the id in the database of the user
                    createdBy: firebaseUser.value?.uid,
                }
            }).then(() => {
                newAlert.value = {
                    title: '',
                    description: '',
                }
                isCreated.value = true
            })
        }
        
        return {
            firebaseUser,
            isCreated,
            loading,
            newAlert,

            createAlert,
            handleSubmitAlert,
        }
    }
}
</script>
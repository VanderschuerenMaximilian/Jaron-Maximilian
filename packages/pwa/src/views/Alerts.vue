<template>
        <template v-if="firebaseUser">
            <main class="pt-[70px] mb-8">
                <h2 class="h2-green text-center my-12">Make an Alert</h2>
                <form @submit.prevent="handleSubmitAlert" class="grid grid-cols-1 max-w-lg mx-auto gap-6">

                    <div v-if="isCreated" class="border-2 border-primary-green bg-secondary-green bg-opacity-25 py-4 px-3 rounded-md">
                        <p class="text-primary-green font-semibold">Your alert is added!</p>
                    </div>

                    <div class="flex flex-col max-w-lg">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" v-model="newAlert.title"
                        :class="{ 'border-red-500': errorFields?.title }">
                        <p v-if="errorFields?.title" class="text-red-500 text-sm">{{ errorFields.title[0].message }}</p>
                    </div>

                    <div class="flex flex-col max-w-lg">
                        <label for="description">Description</label>
                        <input type="text" name="description" id="description" v-model="newAlert.description"
                        :class="{ 'border-red-500': errorFields?.description }">
                        <p v-if="errorFields?.description" class="text-red-500 text-sm">{{ errorFields.description[0].message }}</p>
                    </div>

                    <div class="w-full flex justify-center">
                        <button type="submit" :disabled="loading || !pass"
                            class="flex justify-center bg-secondary-green hover:bg-primary-green px-4 py-2 w-[250px] rounded-sm 
                            text-slate-100 disabled:bg-opacity-40">
                            <Loader2 v-if="loading" class="w-6 h-6 text-slate-100 animate-spin"/>
                            <span v-else>Submit</span>
                        </button>
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
import useCustomPerson from '../composables/useCustomPerson'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ALERT } from '@/graphql/alert.mutation'
import type { Alert } from '@/interfaces/IAlert'
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { Loader2 } from 'lucide-vue-next'


export default {
    components: {
        Loader2,
    },
    setup() {
        const { customPerson } = useCustomPerson()
        const { firebaseUser } = useFirebase()
        const newAlert = ref<Alert>({
            title: '',
            description: '',
        })
        const rules: Rules = {
            title: {
                type: 'string',
                required: true,
                min: 3,
                max: 30,
            },
            description: {
                type: 'string',
                required: true,
                min: 15,
                max: 150,
            },
        }
        const { pass, errorFields } = useAsyncValidator(newAlert, rules)
        const isCreated = ref<boolean>(false)
        const { mutate: createAlert, loading } = useMutation(CREATE_ALERT)
        
        const handleSubmitAlert = () => {
            createAlert({ createAlertInput: 
                {
                    title: newAlert.value.title,
                    description: newAlert.value.description,
                    createdBy: customPerson.value?.id,
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
            pass,
            // isFinished,
            errorFields,

            createAlert,
            handleSubmitAlert,
        }
    }
}
</script>
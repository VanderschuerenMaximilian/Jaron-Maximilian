<template>
        <main class="pt-[70px] min-h-[85vh] flex gap-4 justify-center">
            <template v-if="firebaseUser">
                <section class="bg-white border-t-12 border-primary-green my-20 mx-auto rounded-md px-8 pt-8">
                        <h2 class="h2-green text-center">{{ $t('alerts.title') }}</h2>
                        <form @submit.prevent="handleSubmitAlert" class="flex flex-col justify-center gap-8 py-8"> 
                            <div v-if="isCreated" class="relative h-fit border-2 border-primary-green bg-secondary-green bg-opacity-25 py-4 px-3 rounded-md">
                                <p class="text-primary-green font-semibold">{{ $t('alerts.popup.succes') }}</p>
                                <button class="button-focus rounded-full absolute top-2 right-3 cursor-pointer" @click="closePopUp">
                                    <X class="h-6 w-6 text-primary-green p-1 rounded-full transition-all hover:bg-primary-green hover:bg-opacity-10"/>
                                </button>
                            </div>
    
                            <div class="flex flex-col max-w-lg">
                                <label for="title">{{ $t('alerts.title.label') }}</label>
                                <input type="text" name="title" id="title" v-model="newAlert.title"
                                :placeholder="$t('alerts.title.placeholder')"
                                :class="{ 'border-red-500': errorFields?.title }"
                                class="button-focus bg-light-slate w-[498px] py-2 px-3 rounded-md"
                                >
                                <p v-if="errorFields?.title && errorFields?.title[0].fieldValue" class="text-red-500 text-sm">{{ errorFields.title[0].message }}</p>
                                <p v-if="errorFields?.title && isSubmitted" class="text-red-500 text-sm">{{ errorFields.title[0].message }}</p>
                            </div>
    
                            <div class="flex flex-col max-w-lg">
                                <label for="zone">Zone</label>
                                <select name="zone" id="zone" v-model="newAlert.zoneId"
                                class="button-focus bg-light-slate w-[498px] py-2 px-3 rounded-md">
                                    <option value="" class="bg-white">{{ $t('alerts.zone.placeholder') }}</option>
                                    <option v-for="zone in zones?.zones" :key="zone.id" :value="zone.id" class="bg-white">{{ zone.name }}</option>
                                </select>
                                <p v-if="errorFields?.zones && errorFields?.zones[0].fieldValue" class="text-red-500 text-sm">{{ errorFields.zones[0].message }}</p>
                                <p v-if="errorFields?.zones && isSubmitted" class="text-red-500 text-sm">{{ errorFields.zones[0].message }}</p>
                            </div>
    
                            <div class="flex flex-col max-w-lg">
                                <label for="description">{{ $t('alerts.description.label') }}</label>
                                <textarea type="text" rows="5" name="description" id="description" v-model="newAlert.description"
                                :placeholder="$t('alerts.description.placeholder')"
                                :class="{ 'border-red-500': errorFields?.description }"
                                class="button-focus bg-light-slate w-[498px] py-2 px-3 rounded-md"></textarea>
                                <p v-if="errorFields?.description && errorFields?.description[0].fieldValue" class="text-red-500 text-sm">{{ errorFields.description[0].message }}</p>
                                <p v-if="errorFields?.description && isSubmitted" class="text-red-500 text-sm">{{ errorFields.description[0].message }}</p>
                            </div>
    
                            <div class="w-full flex justify-center">
                                <button type="submit" :disabled="loading || !pass"
                                    class="flex justify-center items-center bg-secondary-green hover:bg-primary-green px-4 py-2 font-bold text-6 button-focus sm:w-90 w-full h-15 rounded-sm 
                                    text-slate-100 disabled:bg-opacity-40">
                                    <Loader2 v-if="loading" class="w-6 h-6 text-slate-100 animate-spin"/>
                                    <span v-else>{{ $t('alerts.submit') }}</span>
                                </button>
                            </div>
                        </form>
                </section>
            </template>
            <template v-else>
                <section class="w-4/5 flex flex-col items-center mt-20">
                    <h3 class="h3-green text-center mb-10">{{ $t('alerts.notify.title') }}</h3>
                    <div class="flex flex-col mr-24">
                        <p class="text-sm">{{ $t('alerts.notify.description') }}</p>
                        <RouterLink to="/login" class="link-focus rounded-lg">
                            <button class="flex justify-center bg-secondary-green hover:bg-primary-green px-4 py-2 w-full rounded-md 
                            text-slate-100 disabled:bg-opacity-40">{{ $t('alerts.notify.logIn') }}</button>
                        </RouterLink>
                    </div>        
                </section>
            </template>
        </main>
</template>
<stlye>

</stlye>
<script lang="ts">
import { ref, watch } from 'vue'
import useFirebase from '../composables/useFirebase'
import useCustomPerson from '../composables/useCustomPerson'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { CREATE_ALERT } from '@/graphql/alert.mutation'
import { GET_ZONES } from '@/graphql/zone.query'
import type { Alert } from '@/interfaces/IAlert'
import type { Zones } from '@/interfaces/IZone'
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { Loader2, X } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

export default {
    components: {
        Loader2,
        X,
        RouterLink,
    },
    setup() {
        const { customPerson } = useCustomPerson()
        const { firebaseUser } = useFirebase()
        const newAlert = ref<Alert>({
            title: '',
            description: '',
            zoneId: '',
        })
        const rules: Rules = {
            title: {
                type: 'string',
                required: true,
                min: 10,
                max: 30,
                
            },
            description: {
                type: 'string',
                required: true,
                min: 15,
                max: 150,
            },
            zones: {
                type: 'string',
                required: true,
                validator(rule, value, callback, source, options) {
                    if (source.zoneId === '' || source.zoneId === undefined) {
                        callback(new Error('Please select a zone'))
                    } else {
                        callback()
                    }
                },
            }
        }
        const { pass, errorFields } = useAsyncValidator(newAlert, rules)
        const isSubmitted = ref<boolean>(false)
        const isCreated = ref<boolean>(false)
        const { result: zones } = useQuery<Zones>(GET_ZONES)
        const { mutate: createAlert, loading } = useMutation(CREATE_ALERT)

        const handleSubmitAlert = () => {
            createAlert({ createAlertInput: 
                {
                    title: newAlert.value.title,
                    description: newAlert.value.description,
                    zoneId: newAlert.value.zoneId,
                    createdBy: customPerson.value?.id,
                }
            }).then(() => {
                newAlert.value = {
                    title: '',
                    description: '',
                    zoneId: '',
                    persons: [],
                }
                isCreated.value = true
            })
        }

        const closePopUp = () => {
            isCreated.value = false
        }
        
        return {
            firebaseUser,
            isCreated,
            isSubmitted,
            loading,
            newAlert,
            pass,
            errorFields,
            zones,

            closePopUp,
            createAlert,
            handleSubmitAlert,
        }
    }
}
</script>
<template>
        <template v-if="firebaseUser">
            <main class="pt-[70px]">
                <h2 class="h2-green text-center my-12">Make an Alert</h2>
                <form class="grid grid-cols-1 max-w-lg mx-auto gap-6">
                    <div class="flex flex-col max-w-lg">
                        <label for="description">What is the problem?</label>
                        <textarea name="description" id="description" cols="30" rows="5"></textarea>
                    </div>
                    <div class="flex flex-col max-w-lg">
                    <label for="description">Where?</label>
                        <!-- TODO: here filter trough all the zones in the database -->
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
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
import useFirebase from '../composables/useFirebase'

const { firebaseUser } = useFirebase()

export default {
    components: {

    },
    setup() {
        return {
            firebaseUser
        }
    }
}

</script>
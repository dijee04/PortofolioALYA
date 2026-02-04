<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    message: String,
    type: {
        type: String,
        default: 'success' // success, error
    },
    show: Boolean
});

const emit = defineEmits(['close']);

onMounted(() => {
    if (props.show) {
        setTimeout(() => {
            emit('close');
        }, 3000); // Auto close after 3s
    }
});
</script>

<template>
    <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="show" class="max-w-sm w-full bg-white dark:bg-zinc-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                         <span v-if="type === 'success'" class="material-icons text-green-400">check_circle</span>
                         <span v-else class="material-icons text-red-400">error</span>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {{ type === 'success' ? 'Success!' : 'Error!' }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {{ message }}
                        </p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                        <button @click="$emit('close')" class="bg-white dark:bg-zinc-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            <span class="sr-only">Close</span>
                            <span class="material-icons text-sm">close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import Modal from '@/components/Modal.vue';

const props = defineProps({
    show: Boolean,
    title: {
        type: String,
        default: 'Confirm Action'
    },
    message: {
        type: String,
        default: 'Are you sure you want to proceed?'
    },
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    processing: Boolean
});

const emit = defineEmits(['close', 'confirm']);
</script>

<template>
    <Modal :show="show" maxWidth="md" @close="$emit('close')">
        <div class="p-6">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
                {{ title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6 font-body">
                {{ message }}
            </p>
            <div class="flex justify-end gap-3">
                <button
                    @click="$emit('close')"
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-bold transition-colors"
                >
                    {{ cancelText }}
                </button>
                <button
                    @click="$emit('confirm')"
                    :disabled="processing"
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-pink-600 font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    <span v-if="processing" class="material-icons animate-spin text-sm">refresh</span>
                    {{ confirmText }}
                </button>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: String, // The Image URL
    label: {
        type: String,
        default: 'Project Image'
    }
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const isDragging = ref(false);
const isUploading = ref(false);
const uploadError = ref(null);

function triggerSelect() {
    fileInput.value.click();
}

function onFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        handleUpload(files[0]);
    }
}

function onDrop(event) {
    isDragging.value = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleUpload(files[0]);
    }
}

async function handleUpload(file) {
    // Validate type
    if (!['image/jpeg', 'image/png', 'image/svg+xml', 'image/jpg'].includes(file.type)) {
        uploadError.value = 'Only JPG, PNG, and SVG files are allowed.';
        return;
    }

    isUploading.value = true;
    uploadError.value = null;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await $fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        // Emit URL
        emit('update:modelValue', response.url);
    } catch (error) {
        console.error('Upload failed:', error);
        uploadError.value = error.data?.statusMessage || 'Upload failed. Please try again.';
    } finally {
        isUploading.value = false;
    }
}
</script>

<template>
    <div class="w-full">
        <label v-if="label" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">{{ label }}</label>
        
        <div 
            class="relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group"
            :class="[
                isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-zinc-700 hover:border-primary/50 dark:hover:border-primary/50',
                modelValue ? 'bg-gray-50 dark:bg-zinc-800' : ''
            ]"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="triggerSelect"
        >
            <input 
                ref="fileInput"
                type="file" 
                class="hidden" 
                accept=".jpg,.jpeg,.png,.svg" 
                @change="onFileSelect"
            />

            <!-- Loading State -->
            <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 z-10 rounded-xl">
                 <div class="flex flex-col items-center">
                    <span class="material-icons animate-spin text-primary text-4xl">refresh</span>
                    <span class="text-sm font-bold text-gray-500 mt-2">Uploading...</span>
                 </div>
            </div>

            <!-- Preview State -->
            <div v-if="modelValue" class="relative group">
                <img :src="modelValue" alt="Preview" class="max-h-64 mx-auto rounded-lg shadow-md object-contain" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                    <span class="text-white font-bold bg-black/50 px-4 py-2 rounded-full">Click or Drop to Replace</span>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="py-8">
                <span class="material-icons text-4xl text-gray-400 group-hover:text-primary transition-colors">cloud_upload</span>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <span class="font-bold text-primary">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-400 mt-1">PNG, JPG, SVG (max. 2MB)</p>
            </div>
        </div>
        <div v-if="uploadError" class="text-red-500 text-xs mt-1 font-bold">{{ uploadError }}</div>
    </div>
</template>

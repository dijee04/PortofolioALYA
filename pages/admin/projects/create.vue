<script setup>
definePageMeta({
    layout: false
});

useHead({
    title: 'Create Project'
});

import ImageUploader from '@/components/ImageUploader.vue';
import ToastNotification from '@/components/ToastNotification.vue';

const form = reactive({
    title: '',
    type: 'software',
    description: '',
    image_url: '',
    tech_stack: '', 
    github_url: '',
    live_url: '',
    processing: false,
    errors: {}
});

const toast = reactive({
    show: false,
    message: '',
    type: 'success'
});

async function submit() {
    form.processing = true;
    form.errors = {};

    try {
        const techStackArray = form.tech_stack
            ? form.tech_stack.split(',').map(tag => tag.trim()).filter(Boolean)
            : [];
        
        await $fetch('/api/projects', {
            method: 'POST',
            body: {
                ...form,
                tech_stack: JSON.stringify(techStackArray)
            }
        });
        
        toast.message = 'Project created successfully!';
        toast.type = 'success';
        toast.show = true;

        setTimeout(() => {
            navigateTo('/admin/projects');
        }, 1000); // Wait for toast
    } catch (error) {
        console.error(error);
        if (error.data && error.data.errors) {
            form.errors = error.data.errors;
        } else {
             toast.message = 'Failed to create project.';
             toast.type = 'error';
             toast.show = true;
        }
    } finally {
        form.processing = false;
    }
}
</script>

<template>
    <NuxtLayout name="admin">
        <template #header>
            Create New Project
            
            <ToastNotification 
                :show="toast.show" 
                :message="toast.message" 
                :type="toast.type" 
                @close="toast.show = false" 
                class="fixed bottom-4 right-4 z-50"
            />
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form @submit.prevent="submit" class="max-w-xl">
                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">Project Type</label>
                            <select v-model="form.type" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-3 px-4 focus:border-primary focus:ring-primary transition-all font-bold">
                                <option value="software">Software Development</option>
                                <option value="design">UI/UX Design</option>
                            </select>
                            <div v-if="form.errors.type" class="text-red-500 text-xs mt-1 font-bold">{{ form.errors.type }}</div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">Title</label>
                            <input v-model="form.title" type="text" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" required />
                            <div v-if="form.errors.title" class="text-red-500 text-xs mt-1">{{ form.errors.title }}</div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description</label>
                            <textarea v-model="form.description" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" rows="4" required></textarea>
                            <div v-if="form.errors.description" class="text-red-500 text-xs mt-1">{{ form.errors.description }}</div>
                        </div>

                         <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Tech Stack (comma separated)</label>
                            <input v-model="form.tech_stack" type="text" placeholder="Vue, Laravel, Tailwind" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                            <div v-if="form.errors.tech_stack" class="text-red-500 text-xs mt-1">{{ form.errors.tech_stack }}</div>
                        </div>

                        <div class="mb-4">
                            <ImageUploader v-model="form.image_url" label="Project Image" />
                            <input type="hidden" v-model="form.image_url"> <!-- Hidden input for validation if needed -->
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">
                                {{ form.type === 'design' ? 'Figma URL' : 'GitHub URL' }}
                            </label>
                            <input v-model="form.github_url" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-3 px-4 focus:border-primary focus:ring-primary transition-all" type="url" :placeholder="form.type === 'design' ? 'https://figma.com/...' : 'https://github.com/...'" />
                             <div v-if="form.errors.github_url" class="text-red-500 text-xs mt-1 font-bold">{{ form.errors.github_url }}</div>
                        </div>

                         <div class="mb-6">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">
                                {{ form.type === 'design' ? 'Behance URL (Optional)' : 'Live Demo URL (Optional)' }}
                            </label>
                            <input v-model="form.live_url" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-3 px-4 focus:border-primary focus:ring-primary transition-all" type="url" :placeholder="form.type === 'design' ? 'https://behance.net/...' : 'https://example.com'">
                             <div v-if="form.errors.live_url" class="text-red-500 text-xs mt-1 font-bold">{{ form.errors.live_url }}</div>
                        </div>

                        <div class="flex items-center gap-4">
                            <button type="submit" class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-colors" :disabled="form.processing">
                                Create Project
                            </button>
                            <NuxtLink to="/admin/projects" class="text-gray-600 dark:text-gray-400 hover:underline">Cancel</NuxtLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

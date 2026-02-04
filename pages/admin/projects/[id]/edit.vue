<script setup>
definePageMeta({
    layout: false
});

useHead({
    title: 'Edit Project'
});

const route = useRoute();
const projectId = route.params.id;

// Fetch project data
const { data: project, status, error } = await useFetch(`/api/projects/${projectId}`);

// Initialize form
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

function parseTechStack(stack) {
    if (Array.isArray(stack)) return stack;
    if (!stack) return [];
    try {
        if (typeof stack === 'string' && stack.trim().startsWith('[')) {
            return JSON.parse(stack);
        }
        return stack.split(',').map(s => s.trim()).filter(Boolean);
    } catch (e) {
        return [];
    }
}

// Watch for project data validity to populate form
watchEffect(() => {
    if (project.value) {
        const p = project.value;
        form.title = p.title;
        form.type = p.type || 'software';
        form.description = p.description;
        form.image_url = p.image_url;
        
        // Handle tech_stack for display in textarea (comma separated)
        const stackArr = parseTechStack(p.tech_stack);
        form.tech_stack = stackArr.join(', ');

        form.github_url = p.github_url;
        form.live_url = p.live_url;
    }
});

async function submit() {
    form.processing = true;
    form.errors = {};

    try {
        const techStackArray = form.tech_stack
            ? form.tech_stack.split(',').map(tag => tag.trim()).filter(Boolean)
            : [];

        await $fetch(`/api/projects/${projectId}`, {
            method: 'PUT',
            body: {
                ...form,
                tech_stack: JSON.stringify(techStackArray)
            }
        });

        toast.message = 'Project updated successfully!';
        toast.type = 'success';
        toast.show = true;

        setTimeout(() => {
            navigateTo('/admin/projects');
        }, 1000);
    } catch (error) {
        console.error(error);
        if (error.data && error.data.errors) {
            form.errors = error.data.errors;
        } else {
             toast.message = 'Failed to update project.';
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
            Edit Project: {{ project ? project.title : 'Loading...' }}

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
                    <div v-if="status === 'pending'">Loading...</div>
                    <div v-else-if="error">Error loading project: {{ error.message }}</div>
                    
                    <form v-else @submit.prevent="submit" class="max-w-xl">
                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Project Type</label>
                            <select v-model="form.type" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                                <option value="software">Software Development</option>
                                <option value="design">UI/UX Design</option>
                            </select>
                            <div v-if="form.errors.type" class="text-red-500 text-xs mt-1">{{ form.errors.type }}</div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Title</label>
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
                            <input type="hidden" v-model="form.image_url">
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">
                                {{ form.type === 'design' ? 'Figma URL' : 'GitHub URL' }}
                            </label>
                            <input v-model="form.github_url" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-3 px-4 focus:border-primary focus:ring-primary transition-all" type="url" :placeholder="form.type === 'design' ? 'https://figma.com/...' : 'https://github.com/...'" />
                        </div>

                         <div class="mb-6">
                            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                {{ form.type === 'design' ? 'Behance URL (Optional)' : 'Live URL (Optional)' }}
                            </label>
                            <input v-model="form.live_url" type="url" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                        </div>

                        <div class="flex items-center gap-4">
                            <button type="submit" class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-colors" :disabled="form.processing">
                                Update Project
                            </button>
                            <NuxtLink to="/admin/projects" class="text-gray-600 dark:text-gray-400 hover:underline">Cancel</NuxtLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

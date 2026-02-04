<script setup>
definePageMeta({
    layout: false,
});

useHead({
    title: 'Projects'
});

// Fetch projects from API with lazy loading for better UX
const { data: projects, status, refresh } = await useFetch('/api/projects', { lazy: true });

import ConfirmModal from '@/components/ConfirmModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';

// State for interaction
const confirmModal = reactive({
    show: false,
    id: null,
    processing: false
});

const toast = reactive({
    show: false,
    message: '',
    type: 'success'
});

function showToast(message, type = 'success') {
    toast.message = message;
    toast.type = type;
    toast.show = true;
}

function confirmDelete(id) {
    confirmModal.id = id;
    confirmModal.show = true;
}

async function executeDelete() {
    confirmModal.processing = true;
    try {
        await $fetch(`/api/projects/${confirmModal.id}`, { method: 'DELETE' });
        refresh(); // Refresh list
        showToast('Project deleted successfully.');
        confirmModal.show = false;
    } catch (error) {
        console.error(error);
        showToast('Failed to delete project.', 'error');
    } finally {
        confirmModal.processing = false;
    }
}
</script>

<template>
    <NuxtLayout name="admin">
        <template #header>
            Manage Projects
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div class="flex justify-end mb-6">
                        <NuxtLink to="/admin/projects/create" class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-colors uppercase tracking-wider text-sm shadow-md">
                            + New Project
                        </NuxtLink>
                    </div>

                    <!-- Loading State -->
                    <div v-if="status === 'pending'" class="text-center py-12">
                        <span class="text-gray-500 dark:text-gray-400">Loading projects...</span>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="status === 'error'" class="text-center py-12 text-red-500">
                        Failed to load projects. Please try refreshing.
                    </div>

                    <!-- Data Table -->
                    <div v-else class="overflow-x-auto">
                        <table class="w-full text-left text-sm text-gray-700 dark:text-gray-300">
                            <thead class="bg-gray-50 dark:bg-zinc-700 uppercase tracking-wider font-bold">
                                <tr>
                                    <th class="px-6 py-3">Project</th>
                                    <th class="px-6 py-3">Tech Stack</th>
                                    <th class="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-4">
                                            <img v-if="project.image_url" :src="project.image_url" class="w-12 h-12 object-cover rounded-lg border border-black/10 dark:border-white/10" alt="Thumb" />
                                            <div v-else class="w-12 h-12 bg-gray-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                                                <span class="material-icons text-gray-400 text-sm">image</span>
                                            </div>
                                            <span class="font-bold">{{ project.title }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex gap-1 flex-wrap">
                                            <span v-for="tech in project.tech_stack" 
                                                  :key="tech" 
                                                  class="px-2 py-1 bg-background-light dark:bg-zinc-600 rounded text-[10px] uppercase tracking-wide font-bold border border-black/10 dark:border-white/10">
                                                {{ tech }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 flex gap-4 items-center">
                                        <NuxtLink :to="`/admin/projects/${project.id}/edit`" class="text-primary hover:text-pink-600 font-bold uppercase text-xs tracking-wide">Edit</NuxtLink>
                                        <button @click="confirmDelete(project.id)" class="text-red-500 hover:text-red-700 font-bold uppercase text-xs tracking-wide">Delete</button>
                                    </td>
                                </tr>
                                <tr v-if="!projects || projects.length === 0">
                                    <td colspan="3" class="px-6 py-8 text-center text-gray-500 font-medium">No projects found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm Modal -->
        <ConfirmModal 
            :show="confirmModal.show" 
            title="Delete Project?"
            message="Are you sure you want to delete this project? This action cannot be undone."
            confirm-text="Yes, Delete it"
            cancel-text="Cancel"
            :processing="confirmModal.processing"
            @close="confirmModal.show = false"
            @confirm="executeDelete"
        />

        <!-- Toast Notification -->
        <div class="fixed bottom-4 right-4 z-50">
            <ToastNotification 
                :show="toast.show" 
                :message="toast.message" 
                :type="toast.type" 
                @close="toast.show = false" 
            />
        </div>

    </NuxtLayout>
</template>

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
    behance_url: '',
    problem_statement: '',
    solution_details: '',
    process_details: '',
    gallery_images: [],
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
                    <form @submit.prevent="submit" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Left Column: Basic Info -->
                        <div class="space-y-4">
                            <h3 class="font-display font-black text-xl uppercase tracking-tighter mb-4 text-primary">Basic Info</h3>
                            
                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">Project Type</label>
                                <select v-model="form.type" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-3 px-4 focus:border-primary focus:ring-primary transition-all font-bold">
                                    <option value="software">Software Development</option>
                                    <option value="design">UI/UX Design</option>
                                </select>
                                <div v-if="form.errors.type" class="text-red-500 text-xs mt-1 font-bold">{{ form.errors.type }}</div>
                            </div>

                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">Title</label>
                                <input v-model="form.title" type="text" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" required />
                                <div v-if="form.errors.title" class="text-red-500 text-xs mt-1">{{ form.errors.title }}</div>
                            </div>

                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description</label>
                                <textarea v-model="form.description" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" rows="4" required></textarea>
                                <div v-if="form.errors.description" class="text-red-500 text-xs mt-1">{{ form.errors.description }}</div>
                            </div>

                             <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Tech Stack (comma separated)</label>
                                <input v-model="form.tech_stack" type="text" placeholder="Vue, Laravel, Tailwind" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                                <div v-if="form.errors.tech_stack" class="text-red-500 text-xs mt-1">{{ form.errors.tech_stack }}</div>
                            </div>

                            <div>
                                <ImageUploader v-model="form.image_url" label="Main Project Image" />
                                <input type="hidden" v-model="form.image_url">
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">
                                        {{ form.type === 'design' ? 'Figma URL' : 'GitHub URL' }}
                                    </label>
                                    <input v-model="form.github_url" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-2 px-3 focus:border-primary focus:ring-primary transition-all text-sm" type="url" />
                                </div>
                                <div>
                                    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">
                                        {{ form.type === 'design' ? 'Behance URL' : 'Live Demo URL' }}
                                    </label>
                                    <input v-model="form.live_url" class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-2 px-3 focus:border-primary focus:ring-primary transition-all text-sm" type="url" />
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide">Behance Case Study URL</label>
                                <input v-model="form.behance_url" placeholder="https://behance.net/..." class="w-full border-2 border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm dark:bg-zinc-800 dark:text-white py-2 px-3 focus:border-primary focus:ring-primary transition-all text-sm" type="url" />
                            </div>
                        </div>

                        <!-- Right Column: Case Study Details -->
                        <div class="space-y-4">
                            <h3 class="font-display font-black text-xl uppercase tracking-tighter mb-4 text-primary">Case Study Details</h3>

                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Problem Statement</label>
                                <textarea v-model="form.problem_statement" placeholder="Explain the challenge..." class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" rows="3"></textarea>
                            </div>

                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Solution Details</label>
                                <textarea v-model="form.solution_details" placeholder="Explain how you solved it..." class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" rows="3"></textarea>
                            </div>

                            <div>
                                <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Process & Methodology</label>
                                <textarea v-model="form.process_details" placeholder="Steps taken..." class="w-full border-gray-300 rounded-md shadow-sm dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" rows="3"></textarea>
                            </div>

                            <!-- Gallery Management -->
                            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label class="text-gray-700 dark:text-gray-300 text-sm font-bold mb-4 uppercase tracking-wide flex justify-between items-center">
                                    Project Gallery
                                    <button type="button" @click="form.gallery_images.push('')" class="text-xs bg-black text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors">+ Add Image</button>
                                </label>
                                
                                <div class="space-y-4">
                                    <transition-group name="list" tag="div">
                                        <div v-for="(img, index) in form.gallery_images" :key="index" class="relative group p-2 border border-gray-200 dark:border-zinc-700 rounded-xl flex gap-4 items-start bg-gray-50 dark:bg-zinc-800/50 mb-3">
                                            <div class="flex-1">
                                                <ImageUploader v-model="form.gallery_images[index]" :label="`Gallery Image ${index + 1}`" />
                                            </div>
                                            <button type="button" @click="form.gallery_images.splice(index, 1)" class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Remove Image">
                                                <span class="material-icons">delete</span>
                                            </button>
                                        </div>
                                    </transition-group>
                                    
                                    <div v-if="form.gallery_images.length === 0" class="text-center py-8 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-xl">
                                        <p class="text-sm text-gray-500">No images in gallery yet.</p>
                                        <button type="button" @click="form.gallery_images.push('')" class="text-primary font-bold text-sm mt-2 hover:underline">Add First Image</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1 lg:col-span-2 flex items-center gap-4 border-t border-gray-200 dark:border-zinc-700 pt-6 mt-2">
                            <button type="submit" class="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-pink-600 hover:-translate-y-1 shadow-lg active:translate-y-0 transition-all uppercase tracking-widest text-sm w-full sm:w-auto" :disabled="form.processing">
                                {{ form.processing ? 'Creating...' : 'Create Project' }}
                            </button>
                            <NuxtLink to="/admin/projects" class="text-gray-600 dark:text-gray-400 font-bold hover:underline px-4">Cancel</NuxtLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

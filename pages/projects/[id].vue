<script setup>
import { onMounted } from 'vue';

const route = useRoute();
const id = route.params.id;

// Fetch Data
const { data: project, pending, error } = await useFetch(`/api/projects/${id}`);

// Page Meta
useHead({
    title: project.value ? `${project.value.title} - Alya Dijayanti` : 'Project Detail',
});

// Animation
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});
</script>

<template>
    <div class="min-h-screen text-slate-800 font-body selection:bg-primary selection:text-white pb-20 bg-white">
        
        <!-- Navbar: Floating Pill (Consistent with Home) -->
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div class="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-xl ring-1 ring-slate-900/5 bg-white/80 backdrop-blur-md">
                <NuxtLink to="/" class="font-display font-bold text-slate-900 tracking-tight hover:text-primary transition-colors">ALYA.</NuxtLink>
                <div class="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                    <NuxtLink to="/#services" class="hover:text-primary transition-colors">Services</NuxtLink>
                    <NuxtLink to="/#work" class="hover:text-primary transition-colors">Work</NuxtLink>
                    <NuxtLink to="/#about" class="hover:text-primary transition-colors">About</NuxtLink>
                </div>
                <div class="flex items-center gap-4">
                     <NuxtLink to="/" class="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
                        <span class="material-icons text-sm">arrow_back</span> Back
                    </NuxtLink>
                </div>
            </div>
        </nav>

        <!-- Loading State -->
        <div v-if="pending" class="min-h-screen flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent shadow-[0_0_15px_#DB2777]"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error || !project" class="min-h-screen flex flex-col items-center justify-center text-center px-4">
             <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <span class="material-icons text-4xl text-red-500">error_outline</span>
            </div>
            <h1 class="text-4xl font-display font-bold text-slate-900 mb-4">Project Not Found</h1>
            <p class="text-slate-500 mb-8">The project you are looking for might have been removed.</p>
            <NuxtLink to="/" class="bg-slate-900 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-wider hover:scale-105 transition-transform">
                Back to Home
            </NuxtLink>
        </div>

        <!-- Content -->
        <div v-else>
            <!-- Hero Header -->
            <section class="relative pt-40 pb-20 px-4 text-center overflow-hidden">
                <!-- Background Glow -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                <div class="max-w-4xl mx-auto reveal-on-scroll">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
                        {{ project.type || 'Software Development' }}
                    </div>
                    <h1 class="text-4xl md:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
                        {{ project.title }}
                    </h1>
                    <p class="text-lg md:text-xl text-slate-600 font-body max-w-2xl mx-auto leading-relaxed">
                        {{ project.description }}
                    </p>
                </div>
            </section>

            <main class="max-w-6xl mx-auto px-4">
                <!-- Main Image -->
                <div class="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl mb-16 reveal-on-scroll relative group bg-white">
                    <img :src="project.image_url" :alt="project.title" class="w-full h-auto object-cover max-h-[700px] group-hover:scale-105 transition-transform duration-1000">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 reveal-on-scroll">
                    <!-- Tech Stack -->
                    <div class="glass-card p-8 bg-white border border-slate-100 shadow-lg">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span class="material-icons text-primary text-sm">layers</span>
                            </div>
                            <h3 class="font-display font-bold text-slate-900 uppercase text-sm tracking-wider">Tech Stack</h3>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tech in (Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse(project.tech_stack || '[]'))" :key="tech" class="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-xs font-mono text-slate-600 rounded-lg border border-slate-200 transition-colors cursor-default">
                                {{ tech }}
                            </span>
                        </div>
                    </div>

                    <!-- Links -->
                    <div class="glass-card p-8 bg-white border border-slate-100 shadow-lg">
                         <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="material-icons text-blue-600 text-sm">link</span>
                            </div>
                            <h3 class="font-display font-bold text-slate-900 uppercase text-sm tracking-wider">Links</h3>
                        </div>
                        <div class="flex flex-col gap-3">
                            <a v-if="project.github_url" :href="project.github_url" target="_blank" class="flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-slate-50">
                                <span class="flex items-center gap-2"><i class="devicon-github-original"></i> Repository</span>
                                <span class="material-icons text-xs opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">arrow_forward</span>
                            </a>
                            <a v-if="project.live_url" :href="project.live_url" target="_blank" class="flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-slate-50">
                                <span class="flex items-center gap-2"><span class="material-icons text-xs">open_in_new</span> Live Demo</span>
                                <span class="material-icons text-xs opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">arrow_forward</span>
                            </a>
                             <a v-if="project.behance_url" :href="project.behance_url" target="_blank" class="flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-slate-50">
                                <span class="flex items-center gap-2"><span class="material-icons text-xs">palette</span> Behance</span>
                                <span class="material-icons text-xs opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">arrow_forward</span>
                            </a>
                        </div>
                    </div>

                    <!-- Project Info -->
                    <div class="glass-card p-8 bg-white border border-slate-100 shadow-lg">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <span class="material-icons text-emerald-600 text-sm">info</span>
                            </div>
                            <h3 class="font-display font-bold text-slate-900 uppercase text-sm tracking-wider">Info</h3>
                        </div>
                        <div class="space-y-4 text-sm">
                            <div class="flex justify-between items-center border-b border-slate-100 pb-2">
                                <span class="text-slate-500">Year</span>
                                <span class="font-mono text-slate-900">{{ new Date(project.created_at).getFullYear() }}</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-slate-100 pb-2">
                                <span class="text-slate-500">Status</span>
                                <span class="font-bold text-emerald-600 px-2 py-0.5 bg-emerald-100 rounded text-[10px] uppercase">Completed</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-slate-500">Client</span>
                                <span class="text-slate-900">Personal Project</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Deep Dive Content -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    <div class="reveal-on-scroll">
                        <h2 class="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span class="w-8 h-1 bg-primary rounded-full"></span>
                            The Challenge
                        </h2>
                        <div class="prose prose-slate prose-lg text-slate-600 leading-relaxed">
                            <p class="whitespace-pre-wrap">{{ project.problem_statement || 'No problem statement provided.' }}</p>
                        </div>
                    </div>

                    <div class="reveal-on-scroll delay-100">
                         <h2 class="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span class="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            The Solution
                        </h2>
                        <div class="prose prose-slate prose-lg text-slate-600 leading-relaxed">
                            <p class="whitespace-pre-wrap">{{ project.solution_details || 'No solution details provided.' }}</p>
                        </div>
                    </div>
                </div>

                <!-- Process Section -->
                <div v-if="project.process_details" class="mb-24 reveal-on-scroll">
                    <div class="glass-card p-10 md:p-16 text-center relative overflow-hidden bg-white border border-slate-100 shadow-lg">
                        <div class="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
                        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]"></div>
                        
                        <h2 class="text-3xl font-display font-bold text-slate-900 mb-8 relative z-10">How It Was Built</h2>
                        <p class="text-slate-600 leading-relaxed max-w-3xl mx-auto relative z-10 whitespace-pre-wrap text-lg">
                            {{ project.process_details }}
                        </p>
                    </div>
                </div>

                <!-- Gallery -->
                <div v-if="project.gallery_images && project.gallery_images.length > 0" class="mb-24">
                    <h2 class="text-3xl font-display font-bold text-slate-900 mb-10 text-center reveal-on-scroll">Project Gallery</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div 
                            v-for="(img, idx) in project.gallery_images" 
                            :key="idx" 
                            class="group rounded-2xl overflow-hidden relative aspect-video border border-slate-200 shadow-md reveal-on-scroll"
                        >
                            <img :src="img" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                             <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                    </div>
                </div>

                <!-- Footer CTA -->
                <div class="text-center py-20 border-t border-slate-200 reveal-on-scroll">
                    <h3 class="font-display text-3xl font-bold text-slate-900 mb-8">Ready to start a project like this?</h3>
                    <NuxtLink to="/#contact" class="inline-flex items-center gap-3 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-lg hover:shadow-primary/30">
                        Let's Talk
                        <span class="material-icons text-base">arrow_forward</span>
                    </NuxtLink>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.delay-100 { transition-delay: 100ms; }
</style>

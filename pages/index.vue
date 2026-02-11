<script setup>
import { onMounted } from 'vue';

useHead({
    title: 'Alya Dijayanti | UI/UX Developer',
    meta: [
        { name: 'description', content: 'Portfolio of Alya Dijayanti - Fullstack Developer & UI/UX Designer' }
    ]
}); 

// Fetch projects
const { data: projects } = await useFetch('/api/projects');

// Scroll Logic & Animation
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
    <div class="min-h-screen pb-20 bg-white text-slate-900 font-body selection:bg-primary selection:text-white">
        
        <!-- Navbar: Floating Pill -->
        <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
            <div class="glass px-6 py-3 rounded-full flex items-center justify-between gap-8 shadow-xl ring-1 ring-slate-900/5 bg-white/80 backdrop-blur-md">
                <a href="#" class="font-display font-bold text-slate-900 tracking-tight hover:text-primary transition-colors">ALYA.</a>
                <div class="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                    <a href="#services" class="hover:text-primary transition-colors">Services</a>
                    <a href="#work" class="hover:text-primary transition-colors">Work</a>
                    <a href="#about" class="hover:text-primary transition-colors">About</a>
                </div>
                <a href="#contact" class="bg-primary hover:bg-primary-dim text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:shadow-[0_4px_14px_0_rgba(219,39,119,0.39)]">
                    Hire Me
                </a>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-28 md:pt-32">
            <!-- Glow Effect -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
            
            <div class="relative z-10 text-center space-y-6 mt-12 md:mt-0">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-primary mb-4 animate-float">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Available for new projects
                </div>
                
                <h1 class="text-5xl md:text-8xl font-display font-bold text-slate-900 tracking-tighter leading-tight relative">
                    Building Digital <br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">Experiences.</span>
                </h1>
                
                <p class="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    I'm Alya Dijayanti. A <span class="text-slate-900 font-bold">Fullstack Developer</span> & <span class="text-slate-900 font-bold">UI/UX Designer</span> crafting pixel-perfect, high-performance web applications.
                </p>

                <div class="pt-8 flex gap-4 justify-center">
                    <a href="#work" class="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform shadow-lg shadow-slate-900/20">
                        View Work
                    </a>
                    <a href="https://www.linkedin.com/in/alya-dijayanti-4a0588291" target="_blank" class="bg-white border border-slate-200 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                        <span class="material-icons text-base">share</span> LinkedIn
                    </a>
                </div>
            </div>
        </section>

        <!-- Bento Grid Services -->
        <section id="services" class="py-24 px-4 max-w-6xl mx-auto">
            <div class="mb-12 text-center reveal-on-scroll">
                <h2 class="text-3xl font-display font-bold text-slate-900 mb-4">What I Do</h2>
                <p class="text-slate-600">Comprehensive solutions for your digital needs</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll">
                <!-- Card 1 -->
                <div class="glass-card p-8 md:col-span-2 relative overflow-hidden group bg-white border border-slate-100 shadow-lg">
                    <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <span class="material-icons text-[120px] text-slate-900">web</span>
                    </div>
                    <div class="relative z-10">
                        <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                            <span class="material-icons">code</span>
                        </div>
                        <h3 class="text-2xl font-display font-bold text-slate-900 mb-3">Fullstack Development</h3>
                        <p class="text-slate-600 leading-relaxed max-w-md">End-to-end development using modern stacks like Vue, Nuxt, Laravel, and Node.js. I build scalable, secure, and fast applications.</p>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="glass-card p-8 relative overflow-hidden group bg-white border border-slate-100 shadow-lg">
                     <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                        <span class="material-icons">palette</span>
                    </div>
                    <h3 class="text-xl font-display font-bold text-slate-900 mb-2">UI/UX Design</h3>
                    <p class="text-slate-600 text-sm">Crafting intuitive and aesthetic interfaces using Figma. Focus on user journey and visual hierarchy.</p>
                </div>

                <!-- Card 3 -->
                <div class="glass-card p-8 relative overflow-hidden bg-white border border-slate-100 shadow-lg">
                    <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                        <span class="material-icons">speed</span>
                    </div>
                    <h3 class="text-xl font-display font-bold text-slate-900 mb-2">Optimization</h3>
                    <p class="text-slate-600 text-sm">Performance tuning, SEO best practices, and database optimization for lightning-fast load times.</p>
                </div>

                <!-- Tech Stack Strip -->
                <div class="glass-card p-8 md:col-span-2 flex flex-wrap gap-4 items-center bg-white border border-slate-100 shadow-lg">
                    <span class="text-sm font-bold text-slate-900 uppercase tracking-wider mr-4">Tech Stack:</span>
                    <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-medium">Vue.js</span>
                    <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-medium">Nuxt</span>
                    <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-medium">Tailwind</span>
                    <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-medium">Laravel</span>
                    <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-medium">Node</span>
                    <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-medium">PostgreSQL</span>
                </div>
            </div>
        </section>

        <!-- Selected Work -->
        <section id="work" class="py-24 relative bg-slate-50">
             <div class="px-4 max-w-6xl mx-auto mb-12 flex justify-between items-end reveal-on-scroll">
                <div>
                    <h2 class="text-3xl font-display font-bold text-slate-900 mb-2">Selected Works</h2>
                    <p class="text-slate-600">A curation of my best projects.</p>
                </div>
                <div class="flex gap-2">
                    <button @click="$refs.scrollContainer.scrollBy({ left: -400, behavior: 'smooth' })" class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-colors shadow-sm">
                        <span class="material-icons text-slate-900">chevron_left</span>
                    </button>
                    <button @click="$refs.scrollContainer.scrollBy({ left: 400, behavior: 'smooth' })" class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-colors shadow-sm">
                        <span class="material-icons text-slate-900">chevron_right</span>
                    </button>
                </div>
            </div>

            <div ref="scrollContainer" class="flex overflow-x-auto gap-8 px-4 md:px-[max(1rem,calc(50vw-42rem))] pb-12 snap-x snap-mandatory scrollbar-hide scroll-smooth reveal-on-scroll">
                <NuxtLink 
                    v-for="project in projects" 
                    :key="project.id" 
                    :to="`/projects/${project.id}`"
                    class="snap-center shrink-0 w-[400px] glass-card group overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:border-primary/30 cursor-pointer shadow-md"
                >
                    <div class="h-56 overflow-hidden relative">
                        <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                        <div class="absolute bottom-4 left-4 flex gap-2">
                            <span v-for="tech in (Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse(project.tech_stack || '[]')).slice(0, 3)" :key="tech"  class="px-2 py-1 bg-white/90 backdrop-blur-md rounded border border-white/20 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{{ project.title }}</h3>
                        <p class="text-slate-600 text-sm line-clamp-2 mb-6">{{ project.description }}</p>
                        <div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                            View Case Study <span class="material-icons text-sm">arrow_forward</span>
                        </div>
                    </div>
                </NuxtLink>

                 <div v-if="!projects || projects.length === 0" class="w-full text-center py-12">
                    <p class="text-slate-500">No projects found.</p>
                </div>
            </div>
        </section>

        <!-- Footer / Contact -->
        <footer id="contact" class="border-t border-slate-200 bg-white">
            <div class="max-w-4xl mx-auto px-4 py-24 text-center">
                 <h2 class="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 reveal-on-scroll">
                    Let's work <span class="text-primary italic">together.</span>
                </h2>
                <p class="text-slate-600 text-lg mb-10 max-w-xl mx-auto reveal-on-scroll">
                    Have a project in mind? Let’s create something extraordinary.
                </p>

                <div class="glass-card max-w-xl mx-auto w-full mb-12 reveal-on-scroll p-8 bg-white border border-slate-200 shadow-xl rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-center text-center md:text-left">
                     <div class="space-y-6 w-full">
                        <a href="https://mail.google.com/" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <span class="material-icons">email</span>
                            </div>
                            <div class="text-left">
                                <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Email Me</div>
                                <div class="text-slate-900 font-medium">dijayantialya4@gmail.com</div>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/alya-dijayanti-4a0588291" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0077b5] shadow-sm group-hover:scale-110 transition-transform">
                                <span class="material-icons">work</span> <!-- Replacing with generic icon if branded icon not available via material-icons, assuming simple layout -->
                            </div>
                             <div class="text-left">
                                <div class="text-xs font-bold uppercase tracking-wider text-slate-400">LinkedIn</div>
                                <div class="text-slate-900 font-medium">Connect on LinkedIn</div>
                            </div>
                        </a>

                        <a href="https://instagram.com" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group">
                             <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#E4405F] shadow-sm group-hover:scale-110 transition-transform">
                                <span class="material-icons">photo_camera</span>
                            </div>
                             <div class="text-left">
                                <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Instagram</div>
                                <div class="text-slate-900 font-medium">Follow on Instagram</div>
                            </div>
                        </a>
                     </div>
                </div>
                <div class="mt-12 text-xs text-slate-400">
                    &copy; {{ new Date().getFullYear() }} Alya Dijayanti. All rights reserved.
                </div>
            </div>
        </footer>

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
</style>

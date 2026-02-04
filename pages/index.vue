<script setup>
useHead({
    title: 'Alya Dijayanti | UI/UX Developer'
});

// Fetch projects from API
const { data: projects } = await useFetch('/api/projects');

// Mock canLogin/canRegister for now, or just remove if unused in method logic
// Links are mostly anchors or external.
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-body transition-colors duration-300 min-h-screen">
        <a class="fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group" href="#contact">
            <span class="material-icons mr-0 group-hover:mr-2 transition-all">send</span>
            <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold uppercase text-xs tracking-widest">Let's Talk</span>
        </a>

        <nav class="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <span class="font-display font-extrabold text-2xl tracking-tighter">PORTO<span class="text-primary">.</span>ALYADIJAYANTI</span>
                <div class="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
                    <a class="hover:text-primary transition-colors" href="#works">Case Studies</a>
                    <a class="hover:text-primary transition-colors" href="#about">Technical</a>
                    <a class="bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity" href="#contact">Hire Me</a>
                </div>
            </div>
        </nav>

        <section class="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 dark:opacity-20 overflow-hidden">
                <h1 class="text-[20vw] font-display font-[900] text-primary uppercase leading-[0.7] text-center select-none tracking-tighter transform -translate-y-24 opacity-50">
                    ALYA<br/>DIJAYANTI
                </h1>
            </div>
            <div class="relative z-10 text-center max-w-5xl">
                <p class="font-handwriting text-3xl md:text-5xl text-slate-600 dark:text-slate-400 mb-8 -rotate-1">
                    Bridging the gap between pixel-perfect design and clean code.
                </p>
                <div class="relative mb-12 inline-block">
                    <div class="relative z-20">
                        <img alt="Alya Dijayanti Portrait" class="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full scrapbook-border mx-auto grayscale hover:grayscale-0 transition-all duration-500 bg-white relative top-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDupm3RrlAHiiNBEQ1s3u-YDEZ6yotQmSrF0xxQSovxHIWmBn36jio-ainS_4fRnm4jGkzzOa2n0dWQ4iY8Cez3kPt6E2TxAw2pYsUHs_kqo00BlWQuo6VsOy5vUKhk3PDiaDh8oUgLKq2cWypG_vJ2YhV6_o32p2xbOQwSNADqpPyWKV4mbBzE8piisVmL0SkuovE_85enyEmKuX-WczdJsTBgOongvAKqMJzmwsvOFNk7_JYBvJDklo0BUdKJMQNgOxNw8EVnQYMH"/>
                        <div class="absolute top-0 -right-12 bg-primary text-white px-6 py-3 rounded-xl rotate-12 shadow-lg font-handwriting text-3xl border-2 border-black z-30">
                            UI/UX Developer
                        </div>
                        <div class="absolute bottom-12 -left-12 bg-white dark:bg-zinc-800 text-black dark:text-white px-6 py-2 rounded-lg -rotate-6 scrapbook-border font-display font-bold text-lg z-30">
                            &lt;FullStack /&gt;
                        </div>
                    </div>
                </div>
                <h2 class="text-6xl md:text-8xl font-display font-black mb-12 leading-[0.85] tracking-tighter">
                    Engineering Seamless<br/><span class="text-primary">User Experiences.</span>
                </h2>
                <div class="flex flex-wrap justify-center gap-4 mb-12">
                    <span class="bg-black text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <span class="material-icons text-sm">code</span> React / Next.js
                    </span>
                    <span class="bg-black text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <span class="material-icons text-sm">palette</span> Figma Expert
                    </span>
                    <span class="bg-black text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <span class="material-icons text-sm">terminal</span> TypeScript
                    </span>
                </div>
                <a class="inline-flex items-center gap-4 bg-primary text-white text-2xl md:text-3xl font-display font-black px-12 py-6 rounded-2xl hover:translate-y-[-6px] hover:shadow-[0_12px_0_0_#db2777] active:translate-y-[2px] transition-all scrapbook-border" href="#contact">
                    LET'S CREATE SOMETHING AMAZING
                    <span class="material-symbols-outlined font-black">rocket_launch</span>
                </a>
            </div>
        </section>

        <section class="pt-10 pb-12 px-6" id="works">
            <div class="max-w-6xl mx-auto">
                <div class="relative z-30 flex flex-col lg:flex-row items-center justify-between gap-10 border-y-[6px] border-black dark:border-primary py-8 mb-20 bg-white dark:bg-zinc-900 px-10 rounded-3xl scrapbook-border">
                    <div class="text-center lg:text-left">
                        <h3 class="text-3xl font-display font-[900] uppercase tracking-tighter flex items-center gap-3 justify-center lg:justify-start">
                            <span class="material-symbols-outlined text-primary scale-125">terminal</span>
                            DEV LINKS BAR
                        </h3>
                        <p class="text-slate-600 dark:text-slate-400 font-handwriting text-2xl mt-1">Check out my repos and design systems</p>
                    </div>
                    <div class="flex flex-wrap justify-center gap-6">
                        <a class="stamp-button rotate-1" href="#">GITHUB</a>
                        <a class="stamp-button -rotate-1" href="#">LINKEDIN</a>
                        <a class="stamp-button rotate-2" href="#">BEHANCE</a>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div class="max-w-2xl">
                        <p class="font-handwriting text-2xl text-primary mb-2">technical case studies...</p>
                        <h2 class="text-5xl md:text-6xl font-display font-black leading-none uppercase tracking-tighter">Solution Showcase.</h2>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="material-icons text-4xl text-primary animate-bounce">south</span>
                        <span class="font-handwriting text-xl">view performance metrics</span>
                    </div>
                </div>
                <!-- Projects Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div v-for="project in projects" :key="project.id" class="group bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden scrapbook-border flex flex-col">
                        <div class="relative h-64 overflow-hidden border-b-2 border-black">
                            <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div class="absolute top-4 right-4 flex gap-2">
                                <span v-for="tech in (Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse(project.tech_stack || '[]'))" :key="tech" class="tech-tag bg-white/90">{{ tech }}</span>
                            </div>
                        </div>
                        <div class="p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <h3 class="text-3xl font-display font-black uppercase tracking-tighter mb-2">{{ project.title }}</h3>
                                <div class="w-12 h-1 bg-primary mb-4"></div>
                                <p class="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">{{ project.description }}</p>
                            </div>
                            
                            <div class="mt-auto px-4 pb-4 flex gap-4">
                                <!-- Software Project Links -->
                                <template v-if="project.type !== 'design'">
                                    <a v-if="project.github_url" :href="project.github_url" target="_blank" class="flex-1 bg-black text-white text-center py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                                        GitHub
                                    </a>
                                    <a v-if="project.live_url" :href="project.live_url" target="_blank" class="flex-1 bg-primary text-white text-center py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-pink-600 transition-colors scrapbook-border">
                                        Live Demo
                                    </a>
                                </template>

                                <!-- Design Project Links -->
                                <template v-else>
                                     <a v-if="project.live_url" :href="project.live_url" target="_blank" class="flex-1 flex items-center justify-center gap-2 bg-[#1769ff] text-white text-center py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-blue-600 transition-colors scrapbook-border">
                                        <span class="material-icons text-sm">palette</span>
                                        Behance
                                    </a>
                                     <a v-if="project.github_url" :href="project.github_url" target="_blank" class="flex-1 flex items-center justify-center gap-2 bg-black text-white text-center py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                                        <span class="material-icons text-sm">design_services</span>
                                        Figma
                                    </a>
                                </template>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="!projects || projects.length === 0" class="col-span-1 lg:col-span-2 text-center py-20">
                         <p class="font-handwriting text-3xl text-slate-500">No projects to showcase yet. Check back soon!</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-24 px-6 bg-white dark:bg-zinc-900 mt-20" id="about">
             <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                     <h3 class="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter">Performance &amp; Metrics Summary</h3>
                     <!-- Stats items -->
                     <div class="grid grid-cols-2 gap-8">
                        <div class="scrapbook-border p-6 bg-background-light dark:bg-zinc-800 -rotate-1">
                            <div class="text-5xl font-display font-black text-primary mb-2">98%</div>
                            <p class="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Lighthouse Score</p>
                        </div>
                         <!-- More stats -->
                     </div>
                </div>
                <!-- Graph placeholder -->
                 <div class="relative">
                    <div class="bg-white dark:bg-zinc-800 p-8 rounded-3xl scrapbook-border -rotate-2">
                        <p class="font-handwriting text-2xl text-center">Quarterly Efficiency &amp; Growth Stats</p>
                    </div>
                </div>
             </div>
        </section>

        <section class="py-20 bg-primary/5">
            <div class="max-w-6xl mx-auto px-6 text-center">
                <h2 class="text-6xl md:text-8xl font-display font-black text-outline uppercase mb-12">Technology & Tools Matrix</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="flex flex-col gap-4">
                        <h4 class="font-display font-black text-primary text-left uppercase tracking-tighter">Frontend</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black rotate-1">REACT.JS</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black -rotate-2">NEXT.JS</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black rotate-3">TYPESCRIPT</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="font-display font-black text-primary text-left uppercase tracking-tighter">UI/UX Design</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black -rotate-1">FIGMA</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black rotate-2">ADOBE ILUSTARTOR</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black -rotate-3 text-primary">FRAMER</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="font-display font-black text-primary text-left uppercase tracking-tighter">Styling</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black rotate-1">TAILWIND</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black -rotate-1">SASS</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black rotate-2">CSS MODULES</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="font-display font-black text-primary text-left uppercase tracking-tighter">Backend & Tools</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black -rotate-2">NODE.JS</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black rotate-1">GIT/GITHUB</span>
                            <span class="bg-white dark:bg-zinc-800 scrapbook-border px-4 py-2 text-sm font-black -rotate-1">POSTGRES</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="py-24 px-6 overflow-hidden" id="contact">
            <div class="max-w-6xl mx-auto relative">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div class="text-left">
                        <h2 class="text-7xl md:text-8xl font-display font-black mb-8 flex flex-col uppercase tracking-tighter">
                            <span>Let's</span>
                            <span class="text-primary italic leading-tight">Connect.</span>
                        </h2>
                        <p class="font-handwriting text-3xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-md">
                            "I'm always looking for new challenges that combine technical precision with creative flair. Let's build something beautiful together."
                        </p>
                        <div class="space-y-4">
                            <a class="text-2xl font-display font-black underline hover:text-primary transition-colors block tracking-tight" href="mailto:alyadijayanti4@gmail.com">alyadijayanti4@gmail.com</a>
                            <div class="flex gap-6 pt-6">
                                <a class="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-primary transition-colors scrapbook-border" href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                                    <svg class="fill-current w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                                <a class="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-primary transition-colors scrapbook-border" href="mailto:alyadijayanti4@gmail.com" aria-label="Email">
                                    <span class="material-icons">email</span>
                                </a>
                                <a class="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-primary transition-colors scrapbook-border" href="https://instagram.com" target="_blank" aria-label="Instagram">
                                    <svg class="fill-current w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-zinc-800 p-8 scrapbook-border rotate-1">
                        <h3 class="font-display font-black text-2xl uppercase mb-6 tracking-tighter">Inquiry Form</h3>
                        <form class="space-y-4" onsubmit="return false">
                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-widest mb-1">Full Name</label>
                                <input class="w-full bg-slate-50 dark:bg-zinc-900 border-2 border-black p-3 rounded-none focus:ring-primary focus:border-primary" placeholder="Enter your name" type="text"/>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-widest mb-1">Work Email</label>
                                <input class="w-full bg-slate-50 dark:bg-zinc-900 border-2 border-black p-3 rounded-none focus:ring-primary focus:border-primary" placeholder="email@company.com" type="email"/>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-widest mb-1">Project Details</label>
                                <textarea class="w-full bg-slate-50 dark:bg-zinc-900 border-2 border-black p-3 rounded-none focus:ring-primary focus:border-primary h-32" placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button class="w-full bg-primary text-white font-display font-black py-4 uppercase scrapbook-border hover:bg-pink-600 transition-colors" type="submit">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
                <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
            </div>
        </footer>
    </div>
</template>

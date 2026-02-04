<script setup>
import { ref } from 'vue';

const showingNavigationDropdown = ref(false);
const route = useRoute();

function logout() {
    const token = useCookie('auth_token');
    token.value = null;
    navigateTo('/auth/login');
}
</script>

<template>
    <div class="min-h-screen bg-background-light dark:bg-background-dark font-body bg-pattern">
        <!-- Sidebar Desktop -->
        <aside class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-900 border-r border-black/5 dark:border-white/5 hidden lg:flex flex-col z-50 transition-all duration-300">
            <div class="h-20 flex items-center px-8 border-b border-black/5 dark:border-white/5">
                <NuxtLink to="/dashboard" class="font-display font-black text-2xl tracking-tighter">
                    PORTO<span class="text-primary">.</span>ALYA
                </NuxtLink>
            </div>

            <nav class="flex-1 px-4 py-8 space-y-2">
                <NuxtLink to="/dashboard" 
                    class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group"
                    :class="route.path === '/dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'">
                    <span class="material-icons text-xl">dashboard</span>
                    Dashboard
                </NuxtLink>
                
                <NuxtLink to="/admin/projects" 
                    class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group"
                    :class="route.path.startsWith('/admin/projects') ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'">
                    <span class="material-icons text-xl">folder</span>
                    Projects
                </NuxtLink>

                 <div class="pt-8 px-4 text-xs font-black text-slate-400 uppercase tracking-widest">Settings</div>
                 <NuxtLink to="/profile" 
                    class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white">
                    <span class="material-icons text-xl">person</span>
                    Profile
                </NuxtLink>
                <div class="border-t border-black/5 dark:border-white/5 mt-4 pt-4">
                    <NuxtLink to="/" target="_blank"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white">
                        <span class="material-icons text-xl">rocket_launch</span>
                        View Site
                    </NuxtLink>
                </div>
            </nav>

            <div class="p-4 border-t border-black/5 dark:border-white/5">
                <button @click="logout" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all">
                    <span class="material-icons">logout</span>
                    Logout
                </button>
            </div>
        </aside>

        <!-- Main Content Wrapper -->
        <div class="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
            <!-- Top Navbar (Mobile + Desktop Header) -->
            <header class="h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between">
                <div class="flex items-center gap-4 lg:hidden">
                    <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="text-slate-500">
                        <span class="material-icons">menu</span>
                    </button>
                    <span class="font-display font-black text-xl tracking-tighter">PORTO.ALYA</span>
                </div>

                <!-- Page Heading (Desktop) -->
                <div class="hidden lg:block">
                     <h2 class="font-display font-bold text-xl text-slate-800 dark:text-white">
                        <slot name="header" />
                     </h2>
                </div>

                <!-- User Dropdown (Simplified) -->
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-3">
                        <div class="text-right hidden sm:block">
                            <div class="font-bold text-sm text-slate-800 dark:text-white">Alya Dijayanti</div>
                            <div class="text-xs text-slate-500 font-bold uppercase tracking-wider">Admin</div>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black border-2 border-primary">
                            AD
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Mobile Menu -->
            <div :class="{'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown}" class="lg:hidden bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 p-4 space-y-2">
                 <NuxtLink to="/dashboard" class="block px-4 py-2 font-bold text-slate-700 dark:text-gray-300">Dashboard</NuxtLink>
                 <NuxtLink to="/admin/projects" class="block px-4 py-2 font-bold text-slate-700 dark:text-gray-300">Projects</NuxtLink>
                 <button @click="logout" class="block w-full text-left px-4 py-2 font-bold text-red-500">Logout</button>
            </div>

            <!-- Page Content -->
            <main class="flex-1 p-6 sm:p-8">
                <slot />
            </main>
        </div>
    </div>
</template>

<style scoped>
.bg-pattern {
    background-image: radial-gradient(#000000 0.5px, transparent 0.5px);
    background-size: 24px 24px;
    background-position: 0 0;
    opacity: 1;
}
.dark .bg-pattern {
    background-image: radial-gradient(#ffffff 0.5px, transparent 0.5px);
    opacity: 1; 
}
</style>

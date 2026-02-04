<script setup>
definePageMeta({
    layout: 'guest'
});

useHead({
    title: 'Login'
});

const form = reactive({
    email: '',
    password: '',
    processing: false,
    errors: {}
});

async function submit() {
    form.processing = true;
    form.errors = {};

    try {
        // Mock login for now or simple API
        // For simple dashboard access without real auth setup yet:
        if (form.email === 'admin@example.com' && form.password === 'password') {
            // Set cookie/state
            const token = useCookie('auth_token');
            token.value = 'dummy_token';
            await navigateTo('/dashboard');
        } else {
             throw { data: { errors: { email: 'These credentials do not match our records.' } } };
        }
    } catch (error) {
        if (error.data && error.data.errors) {
            form.errors = error.data.errors;
        } else {
             form.errors = { email: 'Login failed' };
        }
    } finally {
        form.processing = false;
    }
}
</script>

<template>
    <div class="w-full">
        <!-- Header / Logo Area inside Guest Layout usually handles this, 
             but we can add a specific title here -->
        <h2 class="text-4xl font-display font-black text-center text-slate-800 dark:text-white mb-2 tracking-tighter uppercase">
            Welcome Back
        </h2>
        <p class="text-center text-slate-500 dark:text-slate-400 font-body mb-8">
            Access your dashboard to manage portfolio.
        </p>

        <form @submit.prevent="submit" class="space-y-6">
            <div>
                <label class="block font-bold text-xs uppercase tracking-widest text-slate-500 mb-2">Email</label>
                <input v-model="form.email" type="email" class="w-full bg-slate-50 dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 p-4 rounded-xl focus:ring-primary focus:border-primary transition-all font-bold outline-none" required autofocus />
                <div v-if="form.errors.email" class="text-red-500 text-xs mt-1 font-bold">{{ form.errors.email }}</div>
            </div>

            <div>
                <label class="block font-bold text-xs uppercase tracking-widest text-slate-500 mb-2">Password</label>
                <input v-model="form.password" type="password" class="w-full bg-slate-50 dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 p-4 rounded-xl focus:ring-primary focus:border-primary transition-all font-bold outline-none" required />
            </div>

            <button type="submit" :disabled="form.processing" class="w-full bg-primary text-white py-4 rounded-xl font-display font-black uppercase tracking-widest text-lg hover:bg-pink-600 hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50">
                Sign In
            </button>
        </form>
    </div>
</template>

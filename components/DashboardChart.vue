<script setup>
import VueApexCharts from 'vue3-apexcharts';

const series = [{
    name: 'Views',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
}];

const chartOptions = {
    chart: {
        id: 'view-analytics',
        toolbar: { show: false },
        background: 'transparent'
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    colors: ['#F472B6'],
    theme: {
        mode: 'light' // or dark based on props
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};
</script>

<template>
    <div class="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow sm:rounded-lg scrapbook-border">
        <h3 class="font-display font-bold text-lg mb-4 text-slate-900 dark:text-white">Profile Analytics</h3>
        <VueApexCharts width="100%" type="line" :options="chartOptions" :series="series"></VueApexCharts>
    </div>
</template>

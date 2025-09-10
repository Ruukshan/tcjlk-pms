// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TjcMrPage from '../views/TjcMrPage.vue';
import TjcGrnPage from '../views/TjcGrnPage.vue';
import TjcPackingPage from "@/views/TjcPackingPage.vue";
import TjcProcessingPage from "@/views/TjcProcessingPage.vue";
import TjcQA1Page from "@/views/TjcQA1Page.vue";
import TjcQa2Page from "@/views/TjcQa2Page.vue";


const routes = [

    { path: '/', name: 'GRNPage', component: TjcGrnPage },
    { path: '/tjc-mr', name: 'MRPage', component: TjcMrPage },
    { path: '/tjcprocessing', name: 'TJCPROCESSING', component: TjcProcessingPage },
    { path: '/tjcqa1', name: 'TJCQA1', component: TjcQA1Page },
    { path: '/tjcqa2', name: 'TJCQ2', component: TjcQa2Page },
    { path: '/tjcpacking', name: 'TJCPACKING', component:TjcPackingPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

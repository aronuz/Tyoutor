import { createRouter, createWebHistory } from "vue-router";

import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import TutorsList from '@/pages/tutors/TutorsList.vue';
import TutorRegistation from '@/pages/tutors/TutorRegistration.vue';
import ContactTutor from '@/pages/requests/ContactTutor.vue';
import RequestsReceived from '@/pages/requests/RequestsReceived.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', name: 'home', component: Home
  },
  { path: '/about', name: 'about', component: About },
  { path: '/tutors', name: 'tutors', component: TutorsList },
  {
    path: '/tutors/:id', name: 'tutor',
    props: true,
    children: [
      { path: 'contact', component: ContactTutor } // /tutors/c1/contact
    ],
    component: () =>
      import(/* webpackChunkName: "tutor-page" */ "@/pages/tutors/TutorDetail.vue"),

  },
  { path: '/register', name: 'register', component: TutorRegistation },
  { path: '/requests', name: 'requests', component: RequestsReceived },
  { path: '/:notFound(.*)', name: 'not-found', component: NotFound }
];

const router = createRouter({
  history: createWebHistory('/'), // process.env.BASE_URL
  routes,
});

export default router;
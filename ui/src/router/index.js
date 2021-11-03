import { createRouter, createWebHistory } from "vue-router";

import About from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import TutorsList from '@/pages/tutors/TutorsList.vue';
import TutorRegistation from '@/pages/tutors/TutorRegistration.vue';
import ContactTutor from '@/pages/requests/ContactTutor.vue';
import RequestsReceived from '@/pages/requests/RequestsReceived.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/tutors', component: TutorsList },
  {
    path: '/tutors/:id',
    props: true,
    children: [
      { path: 'contact', component: ContactTutor } // /tutors/c1/contact
    ],
    component: () =>
      import(/* webpackChunkName: "tutor-page" */ "@/pages/tutors/TutorDetail.vue"),

  },
  { path: '/register', component: TutorRegistation },
  { path: '/requests', component: RequestsReceived },
  { path: '/:notFound(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory('/'), // process.env.BASE_URL
  routes,
});

export default router;
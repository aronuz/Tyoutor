import { createRouter, createWebHistory } from "vue-router";

import TutorDetail from './pages/tutors/TutorDetail.vue';
import TutorsList from './pages/tutors/TutorsList.vue';
import TutorRegistation from './pages/tutors/TutorRegistration.vue';
import ContactTutor from './pages/requests/ContactTutor.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', redirect: '/tutors' },
  { path: '/tutors', component: TutorsList },
  {
    path: '/tutors/:id',
    component: TutorDetail,
    children: [
      { path: 'contact', component: ContactTutor } // /tutors/c1/contact
    ]
  },
  { path: '/register', component: TutorRegistation },
  { path: '/requests', component: RequestsReceived },
  { path: '/:notFound(.*)', component: NotFound },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory('/'), // process.env.BASE_URL
  routes,
});

export default router;
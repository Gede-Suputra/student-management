
import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import StudentsView from "../views/StudentView.vue";
import LoginView from "../views/LoginView.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/students",
      name: "students",
      component: StudentsView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        public: true,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  const isLoggedIn = await auth.restoreSession();

  if (to.meta.public) {
    if (to.name === "login" && isLoggedIn) {
      return { name: "dashboard" };
    }

    return true;
  }

  if (!isLoggedIn) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }

  return true;
});

export default router;

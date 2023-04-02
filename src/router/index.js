import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GoalkeepersStats from "../views/GoalkeepersStats.vue";
import DefendersStats from "../views/DefendersStats.vue";
import MidfieldersStats from "../views/MidfieldersStats.vue";
import ForwardsStats from "../views/ForwardsStats.vue";
import FixtureTicker from "../views/FixtureTicker.vue";
import TeamsStats from "../views/TeamsStats.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/fixture-ticker",
      name: "fixture-ticker",
      component: FixtureTicker,
    },
    {
      path: "/teams-stats",
      name: "teams-stats",
      component: TeamsStats,
    },
    {
      path: "/goalkeepers-stats",
      name: "goalkeepers-stats",
      component: GoalkeepersStats,
    },
    {
      path: "/defenders-stats",
      name: "defenders-stats",
      component: DefendersStats,
    },
    {
      path: "/midfielders-stats",
      name: "midfielders-stats",
      component: MidfieldersStats,
    },
    {
      path: "/forwards-stats",
      name: "forwards-stats",
      component: ForwardsStats,
    },
  ],
});

export default router;

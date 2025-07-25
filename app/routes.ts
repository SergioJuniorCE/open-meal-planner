import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("meals", "routes/meals.tsx")
] satisfies RouteConfig;

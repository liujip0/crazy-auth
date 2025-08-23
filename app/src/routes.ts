import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;

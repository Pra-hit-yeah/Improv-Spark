export type RouteTheme = "app" | "pm";

export function getRouteTheme(pathname: string): RouteTheme {
  if (pathname.startsWith("/app")) return "app";
  if (pathname === "/product" || pathname === "/prd" || pathname === "/roadmap") return "pm";
  return "app";
}

export function onRequest(context) {
  const url = new URL(context.request.url);
  const cookie = context.request.headers.get("Cookie") || "";

  if (url.pathname === "/login.html" || url.pathname === "/login") {
    return context.next();
  }

  if (!cookie.includes("session=valid")) {
    return Response.redirect(new URL("/login.html", context.request.url));
  }

  return context.next();
}

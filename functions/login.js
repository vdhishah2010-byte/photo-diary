export async function onRequestPost(context) {
  const { request, env } = context;
  const { code } = await request.json();

  if (code === env.ACCESS_CODE) {
    return new Response("OK", {
      status: 200,
      headers: {
        "Set-Cookie": "session=valid; HttpOnly; Secure; Path=/;"
      }
    });
  }

  return new Response("Unauthorized", { status: 401 });
}

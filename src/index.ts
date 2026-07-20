const PORT = process.env.PORT || 3000;

Bun.serve({
  port: PORT,
  fetch: (request) => {
    if (new URL(request.url).pathname === '/') {
      return new Response(Bun.file('./src/index.html'));
    }
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server running on http://localhost:${PORT}`);

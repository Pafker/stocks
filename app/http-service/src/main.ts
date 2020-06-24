import { serve } from "../deps.ts";

const PORT = 3000;

const s = serve({ port: 3000 });

const body = new TextEncoder().encode("Deno Hello World\n");

console.log(`Server started on port ${PORT}`);
for await (const req of s) {
  req.respond({ body });
}
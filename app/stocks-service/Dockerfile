FROM hayd/alpine-deno:1.3.1
WORKDIR /app
COPY deps.ts .
RUN deno cache deps.ts
ADD . .
RUN deno cache src/main.ts
RUN deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.3.2/denon.ts
ENTRYPOINT ["/usr/local/bin/denon"]
CMD ["run", "--allow-net --allow-env --allow-read", "src/main.ts"]
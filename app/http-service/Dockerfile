FROM hayd/alpine-deno:1.1.1
EXPOSE 3000
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
ADD . .
RUN deno cache src/main.ts
RUN deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts
ENTRYPOINT ["/home/deno/.deno/bin/denon"]
CMD ["run", "--allow-net --allow-env --allow-read", "src/main.ts"]
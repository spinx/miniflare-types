/* eslint-disable  -- TODO */
import { Miniflare } from "miniflare";
const mini = new Miniflare({
    host: "127.0.0.1",
    port: 8787,
    workers: [
        {
            name: "_EdgekitMissingWorkerRoute",
            script: `export default {async fetch(r) {return new Response("No worker for path", {status:404});}};
          `,
            modules: true,
            routes: [`*/_edgekit/404`],
        },
        {
            name: "test",
            script: `
          addEventListener("fetch", (event) => {
            event.respondWith(new Response("Hello from TEST!"));
          })
        `,
            routes: [`*/test`],
        },
        {
            name: "root",
            script: `
          addEventListener("fetch", (event) => {
            event.respondWith(new Response("Hello from ROOT!"));
          })
        `,
            routes: [`*/`],
        },
    ],
});
console.log(`Miniflare listening on ${await mini.ready}`);

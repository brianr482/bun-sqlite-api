import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000);

console.log(`🚀 Sever is running at ${app.server?.hostname}:${app.server?.port}`);

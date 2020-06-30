import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import unAuthRouter from "./routes/unAuthRoutes.js";
import authRouter from "./routes/authRoutes.js";
import notFound from "./notFound.js";
import token from './utils/token.ts'
import authMiddleware from './middleware/auth.js'

const HOST = config().APP_HOST || "https://localhost";
const PORT = +config().APP_PORT || 3000;

const app = new Application();

app.use(unAuthRouter.routes());

app.use((ctx, next) => authMiddleware.authorize(ctx, next))

app.use(authRouter.routes())

app.use(notFound);

console.log(`Running on ${HOST}:${PORT}`);
await app.listen({ port: PORT });

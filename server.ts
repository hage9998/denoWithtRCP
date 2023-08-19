import { initTRPC } from "@trpc/server";
import { database } from "./productsDB.ts";
import { opine } from "@opine";
import { createExpressMiddleware } from "@trpcExpress";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const productsRouter = router({
  get: publicProcedure.query(() => database),
});

const app = opine();

app.use(
  "/api/v1/products",
  createExpressMiddleware({
    router: productsRouter,
    createContext: () => null,
  })
);

const PORT = 3000;
app.listen(PORT);

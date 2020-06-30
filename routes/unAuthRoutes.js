import { Router } from "https://deno.land/x/oak/mod.ts";
import usrCtlr from "../ctlr/usrCtlr.js";
import authCtlr from "../ctlr/authCtlr.js";

const router = new Router();

router
  .get("/user", usrCtlr.index)
  .get("/user/:id", usrCtlr.show)
  .post("/user", usrCtlr.store)
  .patch("/user/:id", usrCtlr.update)
  .delete("/user/:id", usrCtlr.remove);

router
	.post("/login", authCtlr.login);

export default router;

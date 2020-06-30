import { Router } from "https://deno.land/x/oak/mod.ts";
import token from '../utils/token.ts'
import db from "../config/dbs.js";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";


const router = new Router();
const users = db.collection("users");


router
	.get('/me', async (ctx) => {
		const authorization = ctx.request.headers.get("authorization")
		const headerToken = authorization.replace("Bearer ", "")

		const uid = token.fetchUserId(headerToken).uid
		ctx.response.body = await users.findOne({ _id: ObjectId(uid) })
	})


export default router;

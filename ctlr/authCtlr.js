import db from "../config/dbs.js";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import authVld from './authVld.js'
import token from '../utils/token.ts'

const users = db.collection("users");

export default {
	async login(ctx) {
		const credentials = await authVld.loginVld(ctx)
		if(!credentials) {
			ctx.response.body = "Invalid email entered"
			return false
		}	else {

			const foundUser = await users.findOne({ email: credentials.email })
			
			if(!foundUser) {
				ctx.response.body = "Invalid email entered"
				return false
			} else {
				const passwordMatched = await bcrypt.compare(credentials.password, foundUser.password)
				if(!passwordMatched) {
					ctx.response.body = "Invalid password entered"
					return false
				} else {

					//ctx.response.body = foundUser._id.$oid
					ctx.response.body = token.generate(foundUser._id.$oid)

				}
			}
		}
	}
}
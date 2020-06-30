import token from '../utils/token.ts'

export default {
	async authorize(ctx, next) {
		const authorization = ctx.request.headers.get("authorization")
		if(!authorization) {
			ctx.response.status = 401
			ctx.response.body = {error: "Unauthorized no auth token"}
			return false;
		}
		const headerToken = authorization.replace("Bearer ", "")
		const {isValid} = await token.validate(headerToken)
		if(!isValid) {

			const {isExpired} = await token.validate(headerToken)
			if(isExpired) {
				ctx.response.status = 401
				ctx.response.body = {error: "Unauthorized token expired"}
				return false;
			}
			ctx.response.status = 401
			ctx.response.body = {error: "Unauthorized token invalid"}
			return false
			
		} else {
			await next()
		}
	}
}
export default {
	async loginVld(ctx) {
		let errors = [];
    let status;

    const { value } = await ctx.request.body();

    if (!value || Object.keys(value).length === 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Please provide the required data" };
      return false;
    }

    const fields = ["email", "password"];

    for (let i = 0; i < fields.length; i++) {
      if (!value[fields[i]]) {
        status = 422;
        errors.push({ [fields[i]]: `${fields[i]} field is required` });
      }
    }
    if (status === 422) {
      ctx.response.status = 422;
      ctx.response.body = { errors };
      return false;
    }

    return value;

	}
}
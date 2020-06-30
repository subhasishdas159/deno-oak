import db from "../config/dbs.js";
import vld from "./usrVld.js";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";


const users = db.collection("users");

export default {
  async index(ctx) {
    ctx.response.body = await users.find();
  },

  async show(ctx) {
    try {  
      const data = await users.findOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.body = data
    } catch(err) {
      ctx.response.body = {error: "This user doesn't exist in the database"}
    }
      
  },

  async store(ctx) {
    const value = await vld.validate(ctx);
    if (value) {
      const insertId = await users.insertOne({
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password),
        created_at: new Date()
      });

      ctx.response.status = 201;
      ctx.response.body = insertId;
    }
  },

  async update(ctx) {
    const value = await vld.vldUpdate(ctx);

    if (value) {
      try {
        await users.updateOne(
          { _id: ObjectId(ctx.params.id) },
          {
            $set: {
              name: value.name,
              email: value.email,
              password: value.password,
            },
          },
        );
        ctx.response.status = 200;
        ctx.response.body = { msg: "Updated" };
      } catch(err) {
        ctx.response.body = {error: "This user doesn't exist in the database"}
      }
    }
  },

  async remove(ctx) {
    try {
      await users.deleteOne({ _id: { $oid: ctx.params.id } });
      ctx.response.status = 204;
    } catch(err) {
      ctx.response.body = {error: "This user doesn't exist in the database"}
    }
  },
};

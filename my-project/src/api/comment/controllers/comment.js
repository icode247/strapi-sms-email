"use strict";

module.exports = {
  async create(ctx) {
    strapi.service("api::comment.sms").sendSms();
    return await strapi
      .service("api::comment.comment")
      .create(ctx.request.body);
  },
  async get(ctx) {
    return await strapi
      .service("api::comment.comment")
      .get(ctx.request.body);
  },
};

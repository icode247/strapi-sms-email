"use strict";

/**
 * comment service.
 */

module.exports = () => ({
  async create(data) {
    return await strapi.entityService.create("api::comment.comment", {
      data,
    });
  },

  async get() {
    return await strapi.entityService.findMany("api::comment.comment");
  },
});

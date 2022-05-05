module.exports = {
  routes: [
    {
      method: "POST",
      path: "/comment",
      handler: "comment.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/comment",
      handler: "comment.get",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

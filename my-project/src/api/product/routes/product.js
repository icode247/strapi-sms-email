module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/product',
     handler: 'product.create',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

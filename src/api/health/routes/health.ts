export default {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: 'health.check',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/ping',
      handler: 'health.check',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/running',
      handler: 'health.check',
      config: {
        auth: false,
      },
    },
  ],
};

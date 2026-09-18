import type { Core } from '@strapi/strapi';

const HEALTH_PATHS = new Set([
  '/health',
  '/api/health',
  '/ping',
  '/api/ping',
  '/running',
  '/api/running',
]);

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.use(async (ctx, next) => {
      const normalizedPath =
        ctx.path.endsWith('/') && ctx.path.length > 1
          ? ctx.path.slice(0, -1)
          : ctx.path;

      if (
        (ctx.method === 'GET' || ctx.method === 'HEAD') &&
        HEALTH_PATHS.has(normalizedPath)
      ) {
        ctx.status = 200;
        ctx.body = 'running';
        return;
      }

      await next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};

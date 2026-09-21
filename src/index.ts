import type { Core } from '@strapi/strapi';

const HEALTH_PATHS = new Set([
  '/health',
  '/api/health',
  '/ping',
  '/api/ping',
  '/running',
  '/api/running',
]);

const PUBLIC_READ_ACTIONS = [
  'api::global.global.find',
  'api::article.article.find',
  'api::article.article.findOne',
  'api::case-study.case-study.find',
  'api::case-study.case-study.findOne',
  'api::author.author.find',
  'api::author.author.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::testimonial.testimonial.find',
  'api::testimonial.testimonial.findOne',
  'api::page.page.find',
  'api::page.page.findOne',
];

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
   * Automatically ensures public read access for marketing content APIs.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        for (const action of PUBLIC_READ_ACTIONS) {
          const existing = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({
              where: { action, role: publicRole.id },
            });

          if (!existing) {
            await strapi.db
              .query('plugin::users-permissions.permission')
              .create({
                data: {
                  action,
                  role: publicRole.id,
                },
              });
          }
        }
      }

      // Auto-register Next.js instant cache revalidation webhook
      try {
        const webhookUrl =
          process.env.NEXT_REVALIDATE_URL ||
          'http://localhost:3000/api/revalidate?secret=StrapiRevalidateSecret';
        const existingWebhook = await strapi.db
          .query('strapi::webhook')
          .findOne({ where: { name: 'Next.js Revalidation' } });

        if (!existingWebhook) {
          await strapi.db.query('strapi::webhook').create({
            data: {
              name: 'Next.js Revalidation',
              url: webhookUrl,
              headers: {},
              events: [
                'entry.create',
                'entry.update',
                'entry.delete',
                'entry.publish',
                'entry.unpublish',
              ],
              isEnabled: true,
            },
          });
          strapi.log.info('Auto-registered Next.js Revalidation webhook');
        }
      } catch (webhookErr) {
        strapi.log.warn('Could not auto-register webhook during bootstrap:', webhookErr);
      }
    } catch (err) {
      strapi.log.warn('Could not auto-grant public permissions during bootstrap:', err);
    }
  },
};

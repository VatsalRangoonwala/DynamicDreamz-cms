/**
 * global controller
 * Automatically populates navigation groups, links, logos, and SEO
 * when fetching site-wide settings.
 */

import { factories } from '@strapi/strapi';

const GLOBAL_POPULATE = {
  logo: true,
  favicon: true,
  headerNav: {
    populate: {
      icon: true,
      items: {
        populate: '*',
      },
    },
  },
  footerColumns: {
    populate: {
      links: true,
    },
  },
  footerBottomLinks: true,
  socialLinks: {
    populate: {
      icon: true,
    },
  },
  defaultSeo: {
    populate: {
      metaImage: true,
    },
  },
};

export default factories.createCoreController('api::global.global', () => ({
  async find(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = GLOBAL_POPULATE as any;
    }
    return super.find(ctx);
  },
}));

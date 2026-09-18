/**
 * article controller
 * Automatically populates cover images, FAQs, authors with avatars,
 * categories, and SEO metadata.
 */

import { factories } from '@strapi/strapi';

const ARTICLE_POPULATE = {
  coverImage: true,
  faqs: true,
  author: {
    populate: {
      avatar: true,
    },
  },
  categories: true,
  seo: {
    populate: {
      metaImage: true,
    },
  },
};

export default factories.createCoreController('api::article.article', () => ({
  async find(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = ARTICLE_POPULATE as any;
    }
    return super.find(ctx);
  },
  async findOne(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = ARTICLE_POPULATE as any;
    }
    return super.findOne(ctx);
  },
}));

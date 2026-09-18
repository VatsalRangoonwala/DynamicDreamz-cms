/**
 * case-study controller
 * Automatically populates thumbnails, hero images, gallery, metrics,
 * client testimonials, and SEO metadata.
 */

import { factories } from '@strapi/strapi';

const CASE_STUDY_POPULATE = {
  thumbnail: true,
  heroImage: true,
  gallery: true,
  metrics: true,
  testimonial: {
    populate: {
      avatar: true,
      logo: true,
    },
  },
  seo: {
    populate: {
      metaImage: true,
    },
  },
};

export default factories.createCoreController('api::case-study.case-study', () => ({
  async find(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = CASE_STUDY_POPULATE as any;
    }
    return super.find(ctx);
  },
  async findOne(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = CASE_STUDY_POPULATE as any;
    }
    return super.findOne(ctx);
  },
}));

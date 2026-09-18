/**
 * page controller
 * Automatically populates dynamic zone sections, nested components,
 * media assets, and relations when querying modular pages.
 */

import { factories } from '@strapi/strapi';

const PAGE_POPULATE = {
  seo: {
    populate: '*',
  },
  sections: {
    on: {
      'sections.hero': {
        populate: '*',
      },
      'sections.proof-counters': {
        populate: {
          counters: true,
        },
      },
      'sections.faq-accordion': {
        populate: {
          faqs: true,
        },
      },
      'sections.cta-banner': true,
      'sections.features-grid': {
        populate: {
          features: {
            populate: {
              icon: true,
            },
          },
        },
      },
      'sections.process-timeline': {
        populate: {
          steps: true,
        },
      },
      'sections.happy-clients': {
        populate: {
          testimonials: {
            populate: {
              avatar: true,
              logo: true,
            },
          },
        },
      },
      'sections.case-studies': {
        populate: {
          caseStudies: {
            populate: {
              thumbnail: true,
              heroImage: true,
            },
          },
        },
      },
    },
  },
};

export default factories.createCoreController('api::page.page', () => ({
  async find(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = PAGE_POPULATE as any;
    }
    return super.find(ctx);
  },
  async findOne(ctx) {
    if (ctx.query.populate === 'deep' || !ctx.query.populate) {
      ctx.query.populate = PAGE_POPULATE as any;
    }
    return super.findOne(ctx);
  },
}));
